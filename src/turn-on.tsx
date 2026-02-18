import { defaultTemperature, defaultBrightness } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  await executeForAllLights(
    (ip) => ["on", "--ip-address", ip, "--temperature", defaultTemperature(), "--brightness", defaultBrightness()],
    "Error turning on light",
  );
}
