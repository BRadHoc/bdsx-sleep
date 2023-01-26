# bdsx-sleep
![logo](logo-sml.png)

A 50% / 1 Player Sleep script for [@BDSX/bdsx](https://github.com/bdsx/bdsx)
## Configuration

Change:

```js
let OnePlayerSleep = true;
```

in `index.js` to enable One Player Sleep, otherwise it's default 50% of the players online

## Installation
1. To download, clone the repo to your `bdsx/plugins` directory:
```bash
git clone https://github.com/BRadHoc/bdsx-sleep.git bdsx-sleep
```

2. Edit `index.js` in the root directory of `bdsx` to include:
```js
require("./plugins/bdsx-sleep");
```

### How to use?
Just go to bed! This script hooks into the default behaviour for sleeping in minecraft and replaces the functionality to enable 50% or one player to sleep for everyone.