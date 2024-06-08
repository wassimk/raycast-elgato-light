import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { exec } from "child_process";
import { ensureCLI } from "./lib/cli";

export default async function Main({ arguments: { temperature } }: { arguments: { temperature: string } }) {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    try {
      const cliPath = await ensureCLI();
      exec(`"${cliPath}" temperature ${temperature} --ip-address ${ipAddress}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
    } catch (error) {
      console.error(`Failed to ensure CLI: ${error}`);
    }
    await showHUD(`Elgato light temperature set to ${temperature}`);
  }
}
