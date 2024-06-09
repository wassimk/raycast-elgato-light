import { getPreferenceValues } from "@raycast/api";
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

type Preferences = {
  ipAddress: string;
  brightnessChangeAmount: number;
  defaultTemperature: number;
  defaultBrightness: number;
};

export function getIPAddress() {
  const { ipAddress } = getPreferenceValues<Preferences>();
  return ipAddress;
}

export function brightnessChangeAmount() {
  const { brightnessChangeAmount } = getPreferenceValues<Preferences>();
  return brightnessChangeAmount || 5;
}

export function defaultBrightness() {
  const { defaultBrightness } = getPreferenceValues<Preferences>();
  return defaultBrightness || 10;
}

export function defaultTemperature() {
  const { defaultTemperature } = getPreferenceValues<Preferences>();
  return defaultTemperature || 3000;
}

export function openPreferences() {
  const markdown = "IP address is not set. Please update it in extension preferences and try again.";
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
