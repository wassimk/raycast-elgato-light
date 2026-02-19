import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  await executeForAllLights((ip) => ["off", "--ip-address", ip], "Error turning off light");
}
