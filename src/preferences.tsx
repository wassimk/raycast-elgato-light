import { openExtensionPreferences, showHUD } from "@raycast/api";

export default async function Main() {
  try {
    await openExtensionPreferences();
  } catch (error) {
    await showHUD("Error showing preferences");
  }
}
