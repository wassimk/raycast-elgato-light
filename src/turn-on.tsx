import { showHUD } from "@raycast/api";
import { defaultTemperature, defaultBrightness, validateBrightness, validateTemperature } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  const error =
    validateBrightness(defaultBrightness(), "Default brightness") ||
    validateTemperature(defaultTemperature(), "Default temperature");
  if (error) { await showHUD(error); return; }

  await executeForAllLights(
    (ip) => ["on", "--ip-address", ip, "--temperature", defaultTemperature(), "--brightness", defaultBrightness()],
    "Error turning on light",
  );
}
