import { getPreferenceValues } from "@raycast/api";
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

type Preferences = {
  ipAddress1: string;
  ipAddress2: string;
  ipAddress3: string;
  defaultBrightness: number;
  defaultTemperature: number;
  brightnessChangeAmount: number;
  dayLightBrightness: number;
  dayLightTemperature: number;
  nightLightBrightness: number;
  nightLightTemperature: number;
};

export function getIPAddresses() {
  const { ipAddress1, ipAddress2, ipAddress3 } = getPreferenceValues<Preferences>();
  const ipAddresses = [ipAddress1, ipAddress2, ipAddress3].filter(Boolean);

  return ipAddresses;
}

export function defaultBrightness() {
  const { defaultBrightness } = getPreferenceValues<Preferences>();
  return defaultBrightness || 10;
}

export function defaultTemperature() {
  const { defaultTemperature } = getPreferenceValues<Preferences>();
  return defaultTemperature || 3000;
}

export function dayLightBrightness() {
  const { dayLightBrightness } = getPreferenceValues<Preferences>();
  return dayLightBrightness || 10;
}

export function dayLightTemperature() {
  const { dayLightTemperature } = getPreferenceValues<Preferences>();
  return dayLightTemperature || 5000;
}

export function nightLightBrightness() {
  const { nightLightBrightness } = getPreferenceValues<Preferences>();
  return nightLightBrightness || 20;
}

export function nightLightTemperature() {
  const { nightLightTemperature } = getPreferenceValues<Preferences>();
  return nightLightTemperature || 3000;
}

export function brightnessChangeAmount() {
  const { brightnessChangeAmount } = getPreferenceValues<Preferences>();
  return brightnessChangeAmount || 5;
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
