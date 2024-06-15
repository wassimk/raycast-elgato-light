import { showHUD } from "@raycast/api";
import { getIPAddresses, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main({ arguments: { temperature } }: { arguments: { temperature: string } }) {
  const ipAddresses = getIPAddresses();

  if (ipAddresses.length === 0) {
    return openPreferences();
  } else {
    for (const ipAddress of ipAddresses) {
      try {
        console.log(`Setting light temperature to ${temperature} on ${ipAddress}`);
        await execute(`temperature ${temperature} --ip-address ${ipAddress}`);
      } catch (error) {
        console.log(error);
        await showHUD("Error setting light temperature");
      }
    }
  }
}
