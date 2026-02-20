import { showHUD } from "@raycast/api";
import { getIPAddresses } from "./utils";
import { execute } from "./cli";

const MAX_DISCOVERY_ATTEMPTS = 3;

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function executeCommand(baseArgs: string[], errorMessage: string) {
  const ipAddresses = getIPAddresses();

  if (ipAddresses.length > 0) {
    for (const ip of ipAddresses) {
      try {
        await execute(["--ip-address", ip, ...baseArgs]);
      } catch (error) {
        console.log(error);
        await showHUD(`${errorMessage} at ${ip}`);
      }
    }
  } else {
    for (let attempt = 1; attempt <= MAX_DISCOVERY_ATTEMPTS; attempt++) {
      try {
        await execute(baseArgs);
        return;
      } catch (error) {
        console.log(error);

        if (attempt < MAX_DISCOVERY_ATTEMPTS) {
          await showHUD("Light not found, retrying...");
          await sleep(1000);
        } else {
          await showHUD("Could not find light — check power or set IP in preferences.");
        }
      }
    }
  }
}
