import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    execute(`on --ip-address ${ipAddress}`);
    await showHUD("Elgato light turned on");
  }
}
