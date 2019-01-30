"use strict";

function MainController(filterService, spellService, $window, $state, $log, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const FAV_ONLY = "FAV_ONLY";
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $state.go('main');
    });
    ctrl.classes = CLASSES;
    const favOnly = JSON.parse(localStorage.getItem(FAV_ONLY));
    const selectedClass = JSON.parse(localStorage.getItem(SELECTED_CLASS));
    ctrl.classSelected = (selectedClass && CLASSES[selectedClass]) ?
      selectedClass :
      'wizard';
    ctrl.favOnly = filterService.favOnly;
    ctrl.setClass();
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

  ctrl.setFavOnly = function() {
    filterService.setFavOnly(ctrl.favOnly);
    ctrl.search();
  }

  ctrl.reset = function() {
    ctrl.filter = "";
  }

  function getSpells() {
    const allSells = spellService.getSpellsSplited();
    ctrl.total = Object.entries(allSells).reduce(function(total, pair) {
      return total + (pair[1].length);
    }, 0);
    return allSells;
  }
}

const MainComponent = {
  template: require('./main.html'),
  controller: [
    'filterService',
    'spellService',
    '$window',
    '$state',
    '$log',
    'CLASSES',
    MainController
  ]
}

export default MainComponent;
