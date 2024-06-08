import { showHUD } from "@raycast/api";
import { getIPAddress, openPreferences } from "./lib/utils";
import { execute } from "./lib/cli";

export default async function Main({ arguments: { temperature } }: { arguments: { temperature: string } }) {
  const ipAddress = getIPAddress();

  if (!ipAddress) {
    return openPreferences();
  } else {
    execute(`temperature ${temperature} --ip-address ${ipAddress}`);
    await showHUD(`Elgato light temperature set to ${temperature}`);
  }
}
