import { showHUD } from "@raycast/api";
import { getIPAddresses, defaultTemperature, defaultBrightness, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddresses = getIPAddresses();

  if (ipAddresses.length === 0) {
    console.log("No IP addresses found");
    await showHUD(`Please configure at least one Elagto lights ip address.`);
    return openPreferences();
  } else {
    for (const ipAddress of ipAddresses) {
      try {
        console.log(
          `on --ip-address ${ipAddress} --temperature ${defaultTemperature()} --brightness ${defaultBrightness()}`,
        );
        await execute(
          `on --ip-address ${ipAddress} --temperature ${defaultTemperature()} --brightness ${defaultBrightness()}`,
        );
      } catch (error) {
        console.log(error);
        await showHUD(`Error turning on light at ${ipAddress}`);
      }
    }
  }
}
