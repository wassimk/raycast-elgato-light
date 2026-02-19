import { showHUD } from "@raycast/api";
import { nightLightTemperature, nightLightBrightness, validateBrightness, validateTemperature } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  const error =
    validateBrightness(nightLightBrightness(), "Night light brightness") ||
    validateTemperature(nightLightTemperature(), "Night light temperature");
  if (error) { await showHUD(error); return; }

  await executeForAllLights(
    (ip) => [
      "on",
      "--ip-address",
      ip,
      "--temperature",
      nightLightTemperature(),
      "--brightness",
      nightLightBrightness(),
    ],
    "Error turning on light",
  );
}
