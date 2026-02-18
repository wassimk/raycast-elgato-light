import { showHUD } from "@raycast/api";
import { getIPAddresses, openPreferences } from "./utils";
import { execute } from "./cli";

export async function executeForAllLights(argsForIp: (ip: string) => string[], errorMessage: string) {
  const ipAddresses = getIPAddresses();

  if (ipAddresses.length === 0) {
    await showHUD("Please configure at least one Elgato light's IP address.");
    return openPreferences();
  }

  for (const ipAddress of ipAddresses) {
    try {
      await execute(argsForIp(ipAddress));
    } catch (error) {
      console.log(error);
      await showHUD(`${errorMessage} at ${ipAddress}`);
    }
  }
}
