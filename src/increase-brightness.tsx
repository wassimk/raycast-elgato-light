import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    try {
      await execute(`brightness --ip-address ${ipAddress} -- 5`);
      await showHUD("Light brightness increased");
    } catch (error) {
      console.log(error);
      await showHUD("Error increasing light brightness");
    }
  }
}
