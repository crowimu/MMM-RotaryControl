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
    navigationMode: "modules" // "modules" or "pages" (if using MMM-Pages)
  }
}
```

## 🎛️ Supported Actions
- **Rotate Right** ➝ Next module/page
- **Rotate Left** ➝ Previous module/page
- **Press Button** ➝ Toggle module visibility

## 🛠 Dependencies
- [`pigpio`](https://www.npmjs.com/package/pigpio)

## 🚀 Usage
Start MagicMirror:
```sh
pm start
```

## 📜 License
MIT License © 2025 crowimu

