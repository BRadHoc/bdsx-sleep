# bdsx-sleep
![logo](logo-sml.png)

A 50% / 1 Player Sleep script for [@BDSX/bdsx](https://github.com/bdsx/bdsx)
## Configuration

Change:

```js
let OnePlayerSleep = true;
```

in `index.js` to enable One Player Sleep, otherwise it's default 50% of the players online

## Install via NPM
1. Open `package-manager.bat` / `package-manager.sh`
2. Select `@bdsx/bdsx-sleep`

## Manual Installation
To download, clone the repo to your `bdsx/plugins` directory:
```bash
cd plugins/
git clone https://github.com/BRadHoc/bdsx-sleep.git bdsx-sleep
```

That's it! When you run BDSX you should see lines indicating the plugin has installed and loaded.

### How to use?
Just go to bed! This script hooks into the default behaviour for sleeping in minecraft and replaces the functionality to enable 50% or one player to sleep for everyone.