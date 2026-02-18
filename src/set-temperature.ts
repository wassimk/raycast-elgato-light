import { executeForAllLights } from "./lib/commands";

export default async function Main({ arguments: { temperature } }: { arguments: { temperature: string } }) {
  await executeForAllLights(
    (ip) => ["temperature", temperature, "--ip-address", ip],
    "Error setting light temperature",
  );
}
