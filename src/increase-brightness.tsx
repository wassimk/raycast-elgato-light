import { showHUD } from "@raycast/api";
import { getIPAddresses, brightnessChangeAmount, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddresses = getIPAddresses();

  if (ipAddresses.length === 0) {
    return openPreferences();
  } else {
    for (const ipAddress of ipAddresses) {
      try {
        console.log(`brightness --ip-address ${ipAddress} -- ${brightnessChangeAmount()}`);
        await execute(`brightness --ip-address ${ipAddress} -- ${brightnessChangeAmount()}`);
      } catch (error) {
        console.log(error);
        await showHUD("Error increasing light brightness");
      }
    }
  }
}
