
# Simple Mobile for Foundry VTT

The scope of this project is to "upgrade" the work done by [Handyfon](https://github.com/Handyfon), by separate the style based to system, module, components, ecc.

The starting template of this project was inspired from the marvelous project ui [Ernie's Modern UI](https://github.com/ernieayala/ernies-modern-layout)

This module is intended to make the UI more flexible for use with mobiles, tablets and other low-resolution devices.

Current state: Useful for general UI interaction. Map interaction is working, but limited.

**Simple Mobile is in a pre-release phase and may have breaking changes or change default settings without notice**

# Developing (To Do list)

- Integration with [Touch VTT](https://github.com/Oromis/touch-vtt)
- Add a mobile style for some module (CUB, MidiQOL, Better Rolls)
- [DONE updated to 2021-04-09 version 0.2.3] Integration with [simplemobile](https://github.com/Handyfon/simplemobile)
- Integration with [VTTExternalActorViewer](https://github.com/ardittristan/VTTExternalActorViewer) for load only the character sheet without anything else (suggestion Brent Rogers on trello)

## if you want to contribute financially check out the 

### [bounty on trello on league of extraordinary foundryvtt developers](https://trello.com/c/8J4ljdnW/238-uibounty-foundryvtt-simple-mobile)

## Description

IOS is not and will not be supported because the IOS browsers are really bad.

**Manifest:**https://github.com/Handyfon/simplemobile</br>

Watch a demo here : https://www.youtube.com/watch?v=0PJM16LPcZ4

![Alt text](https://i.imgur.com/ZyBj1jD.png "Custom Controls")</br>
![Alt text](https://i.imgur.com/e1xx2dc.png "Responsive CSS")

## Installation

It's always easiest to install modules from the in game add-on browser.

To install this module manually:
1.  Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2.  Click "Install Module"
3.  In the "Manifest URL" field, paste the following url:
`https://raw.githubusercontent.com/Handyfon/simplemobile/master/src/module.json`
4.  Click 'Install' and wait for installation to complete
5.  Don't forget to enable the module in game using the "Manage Module" button

# Features (TO DO)

# Personal Note

Another great module for mobile support is done here [mobile-improvement](https://gitlab.com/fvtt-modules-lab/mobile-improvements) ty to [Sunspots FVTT Modules Lab](https://gitlab.com/fvtt-modules-lab)

# Build

## How to build your css and contribute ?

- Download the project
- Launch from command console `npm install`
- Manage the scss and ts files, when you think you are ready launch `npm run-script build`
- You should see a compiled css and js files under the folder "dist"
- Finally if you are sure is a valid version launch `npm run-script package`, you will find the zip module file under the "package" folder

or 

```bash
npm install
npm run build:watch
```
## npm build scripts

### build

`build` will build the code and copy all necessary assets into the dist folder.

```bash
npm run-script build
```

### build:install

Make a symlink to install the result into your foundry data; create a
`foundryconfig.json` file with your Foundry Data path.

```json
{
  "dataPath": "~/.local/share/FoundryVTT/"
}
```

`build:install` will build and set up a symlink between `dist` and your `dataPath`.

```bash
npm run build:install
```

### build:watch

`build:watch` will build and watch for changes, rebuilding automatically.

```bash
npm run build:watch
```

### clean

`clean` will remove all contents in the dist folder (but keeps the link from
build:install).

```bash
npm run clean
```

## Settings (TO DO)

## [Changelog](./changelog.md)

## Issues

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://github.com/Handyfon/simplemobile/issues ), or using the [Bug Reporter Module](https://foundryvtt.com/packages/bug-reporter/).


## Acknowledgements

Bootstrapped with League of Extraordinary FoundryVTT Developers  [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-types).

Mad props to the 'League of Extraordinary FoundryVTT Developers' community which helped me figure out a lot.
## Credit

Thanks to anyone who helps me with this code! I appreciate the user community's feedback on this project!

- [simplemobile](https://github.com/Handyfon/simplemobile) ty to [Handyfon](https://github.com/Handyfon)
- [Laptop Fix](https://github.com/wsaunders1014/laptop-fix) ty to [wsaunders1014](https://github.com/wsaunders1014)
- [Touch VTT](https://github.com/Oromis/touch-vtt) ty to [Oromis](https://github.com/Oromis)
- [mobile-improvement](https://gitlab.com/fvtt-modules-lab/mobile-improvements) ty to [Sunspots FVTT Modules Lab](https://gitlab.com/fvtt-modules-lab)
- [VTTExternalActorViewer](https://github.com/ardittristan/VTTExternalActorViewer) ty to [ardittristan](https://github.com/ardittristan)
