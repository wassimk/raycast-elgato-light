import { dayLightTemperature, dayLightBrightness } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  await executeForAllLights(
    (ip) => ["on", "--ip-address", ip, "--temperature", dayLightTemperature(), "--brightness", dayLightBrightness()],
    "Error turning on light",
  );
}
