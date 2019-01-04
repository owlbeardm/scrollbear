"use strict";
const allSpells = require('../../resources/spells.json');

function AppController($log, $scope, $window, focusService) {
  const ctrl = this;


  ctrl.$onInit = function() {
    $log.debug("AppController init");
    ctrl.spells = getSpells();
    $log.debug("AppController init", ctrl.spells);
    $log.debug("AppController init", ctrl.spells);
  }

  ctrl.chooseSpell = function(index) {
    ctrl.spell = ctrl.spells[index];
    $log.debug("chooseSpell", ctrl.spell);
  }

  ctrl.search = function() {
    $log.debug("AppController ctrl.search", ctrl.filter);
    ctrl.spells = getSpells();
  }

  function getSpells() {
    return allSpells.filter((value) => {
      if (!ctrl.filter){
        return true;
      }
      return value.name.toLowerCase().includes(ctrl.filter.toLowerCase());
    });
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
