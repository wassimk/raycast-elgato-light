import { getPreferenceValues } from "@raycast/api";
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

type Preferences = {
  ipAddress1: string;
  ipAddress2: string;
  ipAddress3: string;
  defaultBrightness: string;
  defaultTemperature: string;
  brightnessChangeAmount: string;
  dayLightBrightness: string;
  dayLightTemperature: string;
  nightLightBrightness: string;
  nightLightTemperature: string;
};

function getPrefs(): Preferences {
  return getPreferenceValues<Preferences>();
}

export function getIPAddresses(): string[] {
  const { ipAddress1, ipAddress2, ipAddress3 } = getPrefs();
  return [ipAddress1, ipAddress2, ipAddress3].filter(Boolean);
}

export function defaultBrightness(): string {
  return getPrefs().defaultBrightness || "10";
}

export function defaultTemperature(): string {
  return getPrefs().defaultTemperature || "3000";
}

export function dayLightBrightness(): string {
  return getPrefs().dayLightBrightness || "5";
}

export function dayLightTemperature(): string {
  return getPrefs().dayLightTemperature || "5000";
}

export function nightLightBrightness(): string {
  return getPrefs().nightLightBrightness || "20";
}

export function nightLightTemperature(): string {
  return getPrefs().nightLightTemperature || "3000";
}

export function brightnessChangeAmount(): string {
  return getPrefs().brightnessChangeAmount || "5";
}

export function openPreferences() {
  const markdown =
    "An IP address for at least one light must be set. Please update it in extension preferences and try again.";
  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
        </ActionPanel>
      }
    />
  );
}
