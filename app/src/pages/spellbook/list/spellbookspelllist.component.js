"use strict";

function SpellbookSpellListController($log, $state, $scope, notificationService, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellbookSpellListController create');
  const ctrl = this;
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("SpellbookSpellListController init");
    ctrl.classes = CLASSES;
    ctrl.classSelected = spellbookService.selectedCharacter.class;
    ctrl.setClass();
    notificationService.subscribe($scope, notificationService.FILTER_CHANGED, (event, param) => {
      ctrl.spells = getSpells();
    });
  }

  ctrl.chooseSpell = function(spell) {
    const spell_url = spellService.spellNameToUrl(spell.name);
    $state.go('spells', {
      spellUrl: spell_url
    });
  }

  ctrl.search = function() {
    $log.debug("SpellbookSpellListController ctrl.search", ctrl.filter);
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

  ctrl.addToBook = function(spell) {
    if (!spellbookService.selectedCharacter.book) {
      spellbookService.selectedCharacter.book = {};
    }
    console.log(spell.levels);
    let level = spell.levels.reduce((accumulator, currentValue) => {
      if (CLASSES[ctrl.classSelected].search.reduce((acc, curr) => {
          return acc || currentValue.startsWith(curr);
        }, false)) {
        const level = currentValue.substring(currentValue.length - 1);
        if (!accumulator || accumulator > level) {
          return level;
        }
      }
      return accumulator;
    }, undefined);
    // if(level == undefined){
    //   level = '0';
    // }
    if (!spellbookService.selectedCharacter.book[level]) {
      spellbookService.selectedCharacter.book[level] = [];
    }
    spellbookService.selectedCharacter.book[level].push(spell.name);
    spellbookService.saveCharacters()
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
