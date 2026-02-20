# Elgato Light

Control Elgato lights with auto-discovery or by IP address.

## Installation

This extension is not yet available at the official [Raycast store](https://www.raycast.com/store). However, you can still use it.

#### Requirements

- An Elgato brand key light or ring light
- macOS (required for Bonjour auto-discovery)
- node / npm / git

#### Process

Clone this git repository and **cd** into the folder.

```shell
git clone https://github.com/wassimk/raycast-elgato-light.git
cd raycast-elgato-light
```

Run npm install and start the extension in development mode.

```shell
npm install && npm run dev
```

The extension will launch and be installed locally. Even if you quit `npm run dev` with **CTRL-C**, it will remain installed.

## Usage

The extension automatically discovers Elgato lights on your network using Bonjour/mDNS. No configuration is required for single or multi-light setups.

If auto-discovery doesn't work reliably on your network, you can set IP addresses manually in the extension preferences.

### Commands

| Command | Description |
|---------|-------------|
| Turn on | Turn light(s) on to default settings |
| Turn off | Turn light(s) off |
| Turn on Day Light | Turn light(s) on to day light settings |
| Turn on Night Light | Turn light(s) on to night light settings |
| Increase Brightness | Increase the brightness of light(s) |
| Decrease Brightness | Decrease the brightness of light(s) |
| Set Temperature | Set the color temperature of light(s) |
| Discover Lights | Discover lights on the network and cache them |
| Clear Light Cache | Clear the cached light discovery data |
| Preferences | Open extension preferences |

## Acknowledgments

This extension is a wrapper around the CLI tool called [elgato-light](https://github.com/wassimk/elgato-light), which lets you control Elgato lights from the command line.

Also, thanks to Raycast for making such a fantastic and easy tool to develop with!
