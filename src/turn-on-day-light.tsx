import { showHUD } from "@raycast/api";
import { dayLightTemperature, dayLightBrightness, validateBrightness, validateTemperature } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  const error =
    validateBrightness(dayLightBrightness(), "Day light brightness") ||
    validateTemperature(dayLightTemperature(), "Day light temperature");
  if (error) {
    await showHUD(error);
    return;
  }

  await executeForAllLights(
    (ip) => ["on", "--ip-address", ip, "--temperature", dayLightTemperature(), "--brightness", dayLightBrightness()],
    "Error turning on light",
  );
}
