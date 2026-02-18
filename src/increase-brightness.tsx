import { brightnessChangeAmount } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  await executeForAllLights(
    (ip) => ["brightness", brightnessChangeAmount(), "--ip-address", ip],
    "Error increasing light brightness",
  );
}
