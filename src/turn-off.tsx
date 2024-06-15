import { showHUD } from "@raycast/api";
import { getIPAddresses, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddresses = getIPAddresses();

  if (ipAddresses.length === 0) {
    return openPreferences();
  } else {
    for (const ipAddress of ipAddresses) {
      try {
        console.log(`off --ip-address ${ipAddress}`);
        await execute(`off --ip-address ${ipAddress}`);
      } catch (error) {
        console.log(error);
        await showHUD("Error turning off light");
      }
    }
  }
}
