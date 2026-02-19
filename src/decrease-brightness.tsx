import { brightnessChangeAmount } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  await executeForAllLights(
    (ip) => ["brightness", "--ip-address", ip, "--", `-${brightnessChangeAmount()}`],
    "Error decreasing light brightness",
  );
}
