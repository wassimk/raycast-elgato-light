import { nightLightTemperature, nightLightBrightness } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
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
