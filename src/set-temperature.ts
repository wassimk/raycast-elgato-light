import { showHUD } from "@raycast/api";
import { validateTemperature } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main({ arguments: { temperature } }: { arguments: { temperature: string } }) {
  const error = validateTemperature(temperature, "Temperature");
  if (error) { await showHUD(error); return; }

  await executeForAllLights(
    (ip) => ["temperature", temperature, "--ip-address", ip],
    "Error setting light temperature",
  );
}
