# MMM-RotaryNav

A MagicMirror² module to navigate using a rotary encoder.

## 📥 Installation
```sh
cd ~/MagicMirror/modules
git clone https://github.com/crowimu/MMM-RotaryNav.git
cd MMM-RotaryNav
npm install
```

## ⚙️ Configuration
Add this to your `config.js`:
```javascript
{
  module: "MMM-RotaryNav",
  config: {
    navigationMode: "modules", // "modules" or "pages" (if using MMM-Pages)
    clkPin: 17,   // GPIO pin for the rotary encoder CLK
    dtPin: 27,    // GPIO pin for the rotary encoder DT
    swPin: 22     // GPIO pin for the rotary encoder button
  }
}
```

### Adjusting GPIO Pins
If your encoder is connected to different GPIO pins, change the values of `clkPin`, `dtPin`, and `swPin` in `config.js`. These values are passed to the module automatically.

## 🎛️ Supported Actions
- **Rotate Right** ➝ Next module/page
- **Rotate Left** ➝ Previous module/page
- **Press Button** ➝ Toggle module visibility

## 🛠 Dependencies
- [`pigpio`](https://www.npmjs.com/package/pigpio)

## 🚀 Usage
Start MagicMirror:
```sh
npm start
```

## 📜 License
MIT License © 2025 crowimu

