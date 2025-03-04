Module.register('MMM-RotaryControl', {
    defaults: {
        pins: { rotaryA: 17, rotaryB: 27, switch: 22 }
    },

    start: function () {
        this.sendSocketNotification('CONFIG', this.config);
    },

    socketNotificationReceived: function (notification) {
        if (notification === 'PAGE_INCREMENT') {
            this.sendNotification('PAGE_INCREMENT');
        } else if (notification === 'PAGE_DECREMENT') {
            this.sendNotification('PAGE_DECREMENT');
        } else if (notification === 'SHOW_MENU') {
            this.showMenu();
        }
    },

    showMenu: function () {
        this.sendNotification('SHOW_ALERT', {
            title: 'System Menu',
            message: 'Rotate to navigate, press to select.',
            timer: 5000
        });
    }
});