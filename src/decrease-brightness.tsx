import { showHUD } from "@raycast/api";
import { getIPAddress, brightnessChangeAmount, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main() {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    try {
      await execute(`brightness --ip-address ${ipAddress} -- -${brightnessChangeAmount()}`);
      await showHUD("Light brightness decreased");
    } catch (error) {
      console.log(error);
      await showHUD("Error decreasing light brightness");
    }
  }
}
