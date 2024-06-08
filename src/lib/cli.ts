import { environment } from "@raycast/api";
import path from "path/posix";
import fs from "fs";
import afs from "fs/promises";
import download from "download";
import * as tar from "tar";
import { exec } from "child_process";
import sha256 from "sha256-file";

const cliVersion = "0.1.3";
const cliFileInfo = {
  arch: "aarch64",
  pkg: "elgato-light-cli-Darwin-aarch64.tar.gz",
  sha256: "1ab942b3b222766b0cce8fdb54e03fc30934bc636b5656aa639a1364a9793339",
};

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

export function elgatoLightCLIDirectory(): string {
  return path.join(environment.supportPath, "cli");
}

export function elgatoCLIFilePath(): string {
  return path.join(elgatoLightCLIDirectory(), "elgato-light-cli");
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
    const repoUrl = "https://github.com/wassimk/elgato-light-cli";
    const binaryURL = `${repoUrl}/releases/download/v${cliVersion}/elgato-light-cli-Darwin-${cliFileInfo.arch}.tar.gz`;
    const dir = path.join(environment.supportPath, "cli");
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
        await afs.mkdir(dir, { recursive: true });
        await tar.extract({ file: archive, filter: (p) => p === "elgato-light-cli", cwd: dir });
      } else {
        throw Error("Hash of elgato-light CLI archive is wrong");
      }
    } catch (error) {
      throw new Error("Could not extract tar.gz content of elgato-light CLI");
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
