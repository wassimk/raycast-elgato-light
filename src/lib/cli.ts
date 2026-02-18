import { environment } from "@raycast/api";
import path from "path";
import fs from "fs";
import os from "os";
import afs from "fs/promises";
import https from "https";
import * as tar from "tar";
import { execFile } from "child_process";
import sha256 from "sha256-file";

const cliVersion = "0.2.1";
const cliFileInfos = {
  x64: {
    arch: "x86_64",
    pkg: "elgato-light-Darwin-x86_64.tar.gz",
    sha256: "b7cdc963950713cdcf7ca7832446cb4b952c196f0c4b9186395ef926329db013",
  },
  arm64: {
    arch: "aarch64",
    pkg: "elgato-light-Darwin-aarch64.tar.gz",
    sha256: "17964b74f00f2dc8784fa39bbe1859846c71180c289971cd8ada3f395406627c",
  },
};
const cliFileInfo = os.arch() === "arm64" ? cliFileInfos.arm64 : cliFileInfos.x64;

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        if (response.statusCode === 302 || response.statusCode === 301) {
          const redirectUrl = response.headers.location;
          if (!redirectUrl) {
            reject(new Error("Redirect with no location header"));
            return;
          }
          file.close();
          fs.unlinkSync(dest);
          downloadFile(redirectUrl, dest).then(resolve).catch(reject);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Download failed with status ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
        file.on("error", reject);
      })
      .on("error", (error) => {
        fs.unlink(dest, () => reject(error));
      });
  });
}

async function sha256FileHash(filename: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    sha256(filename, (error: Error | null, sum: string | null) => {
      if (error) {
        reject(error);
      } else {
        resolve(sum);
      }
    });
  });
}

function elgatoLightCLIDirectory(): string {
  return path.join(environment.supportPath, "cli");
}

export function elgatoCLIFilePath(): string {
  return path.join(elgatoLightCLIDirectory(), "elgato-light");
}

export async function execute(args: string[]): Promise<void> {
  const cliPath = await ensureCLI();

  return new Promise((resolve, reject) => {
    execFile(cliPath, args, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

export async function ensureCLI() {
  const cli = elgatoCLIFilePath();

  if (fs.existsSync(cli)) {
    return cli;
  }

  const repoUrl = "https://github.com/wassimk/elgato-light";
  const binaryURL = `${repoUrl}/releases/download/v${cliVersion}/${cliFileInfo.pkg}`;
  const cliDir = path.join(environment.supportPath, "cli");
  const tempDir = path.join(environment.supportPath, ".tmp");

  await afs.mkdir(tempDir, { recursive: true });
  const archivePath = path.join(tempDir, cliFileInfo.pkg);

  try {
    await downloadFile(binaryURL, archivePath);
  } catch {
    throw new Error("Could not download elgato-light CLI");
  }

  try {
    const archiveHash = await sha256FileHash(archivePath);

    if (archiveHash !== cliFileInfo.sha256) {
      throw new Error("Hash of elgato-light CLI archive does not match");
    }

    await afs.mkdir(cliDir, { recursive: true });
    await tar.extract({ file: archivePath, filter: (p) => p === "elgato-light", cwd: cliDir });
  } catch (error) {
    if (error instanceof Error && error.message.includes("Hash")) {
      throw error;
    }
    throw new Error("Could not extract downloaded archive of elgato-light CLI");
  } finally {
    await afs.rm(tempDir, { recursive: true });
  }

  try {
    await afs.chmod(cli, "755");
  } catch {
    await afs.rm(cli);
    throw new Error("Could not chmod elgato-light CLI");
  }

  return cli;
}
