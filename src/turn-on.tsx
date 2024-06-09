import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    try {
      await execute(`on --ip-address ${ipAddress}`);
      await showHUD("Light turned on");
    } catch (error) {
      console.log(error);
      await showHUD("Error turning on light");
    }
  }
}
