# MMM-RotaryControl

A MagicMirror module to navigate pages using a rotary encoder.

## Installation

```sh
cd ~/MagicMirror/modules
git clone https://github.com/yourrepo/MMM-RotaryControl.git
cd MMM-RotaryControl
npm install
```

## Configuration

Add this to your `config.js`:

```js
{
    module: 'MMM-RotaryControl',
    config: {
        pins: { rotaryA: 17, rotaryB: 27, switch: 22 }
    }
}
```

## Features
- Rotate left/right to switch pages in MMM-Pages.
- Long press opens a system menu.

Enjoy!