"use strict";

function SpellbookSpellListController($log, $state, $scope, notificationService, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    ctrl.classes = CLASSES;
    ctrl.classSelected = spellbookService.selectedCharacter.class;
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

const SpellbookSpellListComponent = {
  template: require('./spellbookspelllist.html'),
  controller: [
    '$log',
    '$state',
    '$scope',
    'notificationService',
    'filterService',
    'spellService',
    'spellbookService',
    'CLASSES',
    SpellbookSpellListController
  ],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default SpellbookSpellListComponent;
