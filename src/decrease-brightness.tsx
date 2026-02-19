import { showHUD } from "@raycast/api";
import { brightnessChangeAmount, validateBrightness } from "./lib/utils";
import { executeForAllLights } from "./lib/commands";

export default async function Main() {
  const error = validateBrightness(brightnessChangeAmount(), "Brightness increment amount");
  if (error) {
    await showHUD(error);
    return;
  }

  await executeForAllLights(
    (ip) => ["brightness", "--ip-address", ip, "--", `-${brightnessChangeAmount()}`],
    "Error decreasing light brightness",
  );
}
