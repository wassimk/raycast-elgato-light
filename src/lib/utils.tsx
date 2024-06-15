import { getPreferenceValues } from "@raycast/api";
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

type Preferences = {
  ipAddress1: string;
  ipAddress2: string;
  ipAddress3: string;
  brightnessChangeAmount: number;
  defaultTemperature: number;
  defaultBrightness: number;
};

export function getIPAddresses() {
  const { ipAddress1, ipAddress2, ipAddress3 } = getPreferenceValues<Preferences>();

  const ipAddresses = [];
  if (ipAddress1) {
    ipAddresses.push(ipAddress1);
  }
  if (ipAddress2) {
    ipAddresses.push(ipAddress2);
  }
  if (ipAddress3) {
    ipAddresses.push(ipAddress3);
  }
  return ipAddresses;
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
