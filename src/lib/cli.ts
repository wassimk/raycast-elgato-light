import { environment } from "@raycast/api";
import path from "path/posix";
import fs from "fs";
import os from "os";
import afs from "fs/promises";
import download from "download";
import * as tar from "tar";
import { exec } from "child_process";
import sha256 from "sha256-file";

const cliVersion = "0.2.2";
const cliFileInfos = {
  x64: {
    arch: "x86_64",
    pkg: "elgato-light-Darwin-x86_64.tar.gz",
    sha256: "60ee7c0bfccca79cd504c27336a4aaf5ef492cb94e0d2a6d5a46f2fc1258889a",
  },
  arm64: {
    arch: "aarch64",
    pkg: "elgato-light-Darwin-aarch64.tar.gz",
    sha256: "20899f0ede797c6d13893b792b705454b896085f4188bc816f655a97bc2c09e1",
  },
};
const cliFileInfo = os.arch() === "arm64" ? cliFileInfos.arm64 : cliFileInfos.x64;

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

export async function execute(command: string) {
  const cliPath = await ensureCLI();

  exec(`"${cliPath}" ${command}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

export async function ensureCLI() {
  const cli = elgatoCLIFilePath();

  if (fs.existsSync(cli)) {
    return cli;
  } else {
    const repoUrl = "https://github.com/wassimk/elgato-light";
    const binaryURL = `${repoUrl}/releases/download/v${cliVersion}/elgato-light-Darwin-${cliFileInfo.arch}.tar.gz`;
    const cliDir = path.join(environment.supportPath, "cli");
    const tempDir = path.join(environment.supportPath, ".tmp");

    try {
      await download(binaryURL, tempDir, { filename: cliFileInfo.pkg });
    } catch (error) {
      throw Error("Could not download elgato-light CLI");
    }

    try {
      const archive = path.join(tempDir, cliFileInfo.pkg);
      const archiveHash = await sha256FileHash(archive);

      if (archiveHash === cliFileInfo.sha256) {
        await afs.mkdir(cliDir, { recursive: true });
        await tar.extract({ file: archive, filter: (p) => p === "elgato-light", cwd: cliDir });
      } else {
        throw Error("Hash of elgato-light CLI archive is wrong");
      }
    } catch (error) {
      throw Error("Could not extract downloaded archived of elgato-light CLI");
    } finally {
      await afs.rm(tempDir, { recursive: true });
    }

    try {
      await afs.chmod(cli, "755");
    } catch (error) {
      await afs.rm(cli);
      throw Error("Could not chmod elgato-light CLI");
    }

    return cli;
  }
}
