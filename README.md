# Elgato Lights Controller

Control Elgato lights by IP address.

## Installation

This extension is not yet available at the official [Raycast store](https://www.raycast.com/store). However, you can still use it.

#### Requirements

- An Elgato brand key light or ring light
- The light has a dedicated IP address
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

## Acknowledgments

This extension is a wrapper around the CLI tool called [elgato-light](https://github.com/wassimk/elgato-light), which lets you control a light with the command line. 

Also, thanks to Raycast for making such a fantastic and easy tool to develop with!

