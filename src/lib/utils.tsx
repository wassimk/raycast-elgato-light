import { getPreferenceValues } from "@raycast/api";
import { ActionPanel, Action, Detail, openExtensionPreferences } from "@raycast/api";

type Preferences = {
  ipAddress: string;
};

export function getIPAddress() {
  const { ipAddress } = getPreferenceValues<Preferences>();
  return ipAddress;
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
