import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { exec } from "child_process";
import { ensureCLI } from "./lib/cli";

export default async function Main() {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    try {
      const cliPath = await ensureCLI();
      exec(`"${cliPath}" on --ip-address ${ipAddress}`, (error, stdout, stderr) => {
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
    await showHUD("Elgato light turned on");
  }
}
