"use strict";
const NodeHelper = require("node_helper");
const pigpio = require("pigpio");
const Gpio = pigpio.Gpio;

module.exports = NodeHelper.create({
  start: function () {
    console.log("[MMM-RotaryNav] Module started");
    this.config = null;
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload;
      this.initEncoder();
    }
  },

  initEncoder: function () {
    if (!this.config) {
      console.error("[MMM-RotaryNav] Config not received!");
      return;
    }

    const clk = new Gpio(this.config.clkPin, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, edge: Gpio.EITHER_EDGE });
    const dt = new Gpio(this.config.dtPin, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, edge: Gpio.EITHER_EDGE });
    const sw = new Gpio(this.config.swPin, { mode: Gpio.INPUT, pullUpDown: Gpio.PUD_UP, edge: Gpio.FALLING_EDGE });

    let lastState = clk.digitalRead();

    clk.on("interrupt", (level) => {
      const dtState = dt.digitalRead();
      if (level !== lastState) {
        this.sendSocketNotification(dtState ? "ROTARY_RIGHT" : "ROTARY_LEFT");
        lastState = level;
      }
    });

    sw.on("interrupt", () => {
      this.sendSocketNotification("ROTARY_PRESS");
    });
  },

  stop: function () {
    console.log("[MMM-RotaryNav] Module stopped");
  }
});
