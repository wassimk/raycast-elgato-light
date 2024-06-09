import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    try {
      await execute(`off --ip-address ${ipAddress}`);
      await showHUD("Light turned off");
    } catch (error) {
      console.log(error);
      await showHUD("Error turning off light");
    }
  }
}
