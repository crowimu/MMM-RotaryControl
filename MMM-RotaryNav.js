'use strict';

Module.register('MMM-RotaryNav', {
  defaults: {
    navigationMode: 'modules', // 'modules' or 'pages' (if MMM-Pages is installed)
  },

  start: function () {
    console.log('[MMM-RotaryNav] Starting module');
    this.currentIndex = 0;
    this.moduleList = []; // List of active modules
    this.getModulesList();
    this.sendSocketNotification('CONFIG', this.config);
  },

  getModulesList: function () {
    this.moduleList = MM.getModules().filter(m => !m.hidden);
  },

  notificationReceived: function (notification, payload) {
    if (notification === 'ROTARY_RIGHT') {
      this.navigate(1);
    } else if (notification === 'ROTARY_LEFT') {
      this.navigate(-1);
    } else if (notification === 'ROTARY_PRESS') {
      this.toggleModule();
    }
  },

  navigate: function (direction) {
    if (this.config.navigationMode === 'modules') {
      this.currentIndex = (this.currentIndex + direction + this.moduleList.length) % this.moduleList.length;
      this.highlightModule();
    } else if (this.config.navigationMode === 'pages' && this.config.pagesModule) {
      this.sendNotification('PAGE_INCREMENT', { direction: direction });
    }
  },

  highlightModule: function () {
    MM.getModules().forEach((module, index) => {
      module.hide(500, { lockString: 'ROTARY_NAV' });
      if (index === this.currentIndex) {
        module.show(500, { lockString: 'ROTARY_NAV' });
      }
    });
  },

  toggleModule: function () {
    const currentModule = this.moduleList[this.currentIndex];
    if (currentModule.hidden) {
      currentModule.show(500, { lockString: 'ROTARY_NAV' });
    } else {
      currentModule.hide(500, { lockString: 'ROTARY_NAV' });
    }
  }
});
