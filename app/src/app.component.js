"use strict";

function AppController($log) {
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("AppController init");
  }

}

const AppComponent = {
  template: require('./app.html'),
  controller: ['$log', AppController]
};

export default AppComponent;
