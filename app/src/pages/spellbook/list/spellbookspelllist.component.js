"use strict";

function SpellbookSpellListController($log, $state, $rootScope, $scope, $document, $timeout, notificationService, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellbookSpellListController create');
  const ctrl = this;
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("SpellbookSpellListController init");
    if (!spellbookService.selectedCharacter) {
      $state.go('spellbook.characters');
    }
    ctrl.classes = CLASSES;
    ctrl.classSelected = spellbookService.selectedCharacter.class;
    ctrl.setClass();
    notificationService.subscribe($scope, notificationService.FILTER_CHANGED, (event, param) => {
      ctrl.spells = getSpells();
    });
    notificationService.subscribe($scope, notificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED, (event, param) => {
      $log.debug("SpellbookSpellListController notificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED", param);
      if (param) {
        ctrl.classSelected = spellbookService.selectedCharacter.class;
        ctrl.setClass();
      } else {
        ctrl.classToAll();
      }
    });
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh')
    });
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit', Math.round(performance.now()) - $rootScope.onStartTime, $state.current.name);
    }
  }

  ctrl.chooseSpell = function(spell) {
    spellService.showSpell(spell.name);
  }

  ctrl.search = function() {
    $log.debug("SpellbookSpellListController ctrl.search", ctrl.filter);
    ctrl.spells = getSpells();
  }

  ctrl.setClass = function() {
    $log.debug("SpellbookSpellListController ctrl.search", ctrl.classSelected);
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

  ctrl.click = function(name) {
    const top = $document.scrollTop(); // angular.element('#heading' + name).offset().top;
    $timeout($document.scrollTop(top));
  }

}

const SpellbookSpellListComponent = {
  template: require('./spellbookspelllist.html'),
  controller: [
    '$log',
    '$state',
    '$rootScope',
    '$scope',
    '$document',
    '$timeout',
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
