"use strict";

function MainController(notificationService, filterService, spellService, $window, $state, $scope, $log, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    ctrl.classes = CLASSES;
    const selectedClass = JSON.parse(localStorage.getItem(SELECTED_CLASS));
    ctrl.classSelected = (selectedClass && CLASSES[selectedClass]) ?
      selectedClass :
      'wizard';
    ctrl.setClass();
    notificationService.subscribe($scope, notificationService.FILTER_CHANGED, (event, param) => {
      ctrl.spells = getSpells();
    });
  }

  ctrl.search = function() {
    $log.debug("AppController ctrl.search", ctrl.filter);
    ctrl.spells = getSpells();
  }

  ctrl.setClass = function() {
    spellService.setClass(ctrl.classSelected);
    localStorage.setItem(SELECTED_CLASS, JSON.stringify(ctrl.classSelected));
    ctrl.search();
  }

  ctrl.classToAll = function() {
    ctrl.classSelected = 'all';
    ctrl.setClass();
  }

  function getSpells() {
    ctrl.otherSpellsCount = 0;
    const allSells = spellService.getSpellsSplited();
    ctrl.total = Object.entries(allSells).reduce(function(total, pair) {
      return total + (pair[1].length);
    }, 0);
    if (!ctrl.total) {
      ctrl.otherSpellsCount = spellService.getSpellsCountByFilter();
    }
    return allSells;
  }
}

const MainComponent = {
  template: require('./main.html'),
  controller: [
    'notificationService',
    'filterService',
    'spellService',
    '$window',
    '$state',
    '$scope',
    '$log',
    'CLASSES',
    MainController
  ]
}

export default MainComponent;
