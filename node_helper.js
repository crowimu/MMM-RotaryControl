'use strict';

const NodeHelper = require('node_helper');
const Gpio = require('rpi-gpio-buttons');
const { exec } = require('child_process');

module.exports = NodeHelper.create({
    start: function () {
        console.log('[MMM-RotaryControl] Module started');
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === 'CONFIG') {
            this.config = payload;
            this.setupEncoder();
        } else if (notification === 'EXEC_COMMAND') {
            exec(payload, (error, stdout, stderr) => {
                if (error) console.error(`[MMM-RotaryControl] Error: ${stderr}`);
            });
        }
    },

    setupEncoder: function () {
        this.lastPressTime = 0;
        const pins = this.config.pins || { rotaryA: 17, rotaryB: 27, switch: 22 };
        
        this.encoder = new Gpio({
            pins: {
                rotaryA: pins.rotaryA,
                rotaryB: pins.rotaryB,
                switch: pins.switch
            },
            encoder: { debounce: 10 },
            switch: { debounce: 50 }
        });
        
        this.encoder.on('rotation', (direction) => {
            if (direction === 'left') {
                this.sendSocketNotification('PAGE_DECREMENT');
            } else if (direction === 'right') {
                this.sendSocketNotification('PAGE_INCREMENT');
            }
        });

        this.encoder.on('click', () => {
            let now = Date.now();
            if (now - this.lastPressTime > 1000) {
                this.sendSocketNotification('SHOW_MENU');
            }
            this.lastPressTime = now;
        });
    }
});