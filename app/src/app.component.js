"use strict";

function AppController($log, $scope, $window, focusService) {
  const ctrl = this;


  ctrl.$onInit = function() {
    $log.debug("AppController init");
    ctrl.spells = require('../../resources/spells.json');
    $log.debug("AppController init", ctrl.spells);
    $log.debug("AppController init", ctrl.spells);
  }

  ctrl.chooseSpell = function(index) {
    ctrl.spell = ctrl.spells[index];
    $log.debug("chooseSpell", ctrl.spell);
  }
}

const AppComponent = {
  template: require('./app.html'),
  controller: [
    '$log',
    '$scope',
    '$window',
    'focusService',
    AppController
  ]
};

export default AppComponent;
