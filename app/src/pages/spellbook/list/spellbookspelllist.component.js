"use strict";

function SpellbookSpellListController($log, $state, $scope, notificationService, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellbookSpellListController create');
  const ctrl = this;
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("SpellbookSpellListController init");
    if (!spellbookService.selectedCharacter) {
      $state.go('spellbook.characters');
    }
    ctrl.prepared = spellbookService.selectedCharacter.prepared;
    ctrl.classes = CLASSES;
    ctrl.classSelected = spellbookService.selectedCharacter.class;
    ctrl.setClass();
    notificationService.subscribe($scope, notificationService.FILTER_CHANGED, (event, param) => {
      ctrl.spells = getSpells();
    });
  }

  ctrl.chooseSpell = function(spell) {
    const spell_url = spellService.spellNameToUrl(spell.name);
    $state.go('spells', {spellUrl: spell_url});
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

  ctrl.isInSpellBook = function(spellName) {
    if (spellbookService.selectedCharacter.book) {
      const present = Object.entries(spellbookService.selectedCharacter.book).reduce((acc, curr) => acc || curr[1].reduce((acc2, curr2) => acc2 || (curr2 == spellName), false), false);
      return present;
    }
    return false;
  }

  ctrl.isSpellPrepared = function(spellName) {
    if (!spellbookService.selectedCharacter.prepared) {
      if (spellbookService.selectedCharacter.knownSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.knownSpells).reduce((acc, curr) => acc || curr[1].spells.reduce((acc2, curr2) => acc2 || (curr2 == spellName), false), false);
        return present;
      }
    } else {
      if (spellbookService.selectedCharacter.preparedSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.preparedSpells).reduce((acc, curr) => acc + curr[1].spells.reduce((acc2, curr2) => acc2 + (
          curr2.name == spellName
          ? 1
          : 0), 0), 0);
        return present;
      }
    }
    return false;
  }

  ctrl.addToBook = function(lvl, spell) {
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
    if (level == undefined) {
      level = lvl;
    }
    if (!spellbookService.selectedCharacter.book[level]) {
      spellbookService.selectedCharacter.book[level] = [];
    }
    spellbookService.selectedCharacter.book[level].push(spell.name);
    spellbookService.saveCharacters()
  }

  ctrl.addSpell = function(lvl, spell) {
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
    if (level == undefined) {
      level = lvl;
    }
    if (!spellbookService.selectedCharacter.prepared) {
      if (!spellbookService.selectedCharacter.knownSpells) {
        spellbookService.selectedCharacter.knownSpells = {};
      }
      if (!spellbookService.selectedCharacter.knownSpells[level]) {
        spellbookService.selectedCharacter.knownSpells[level] = {
          spells: []
        };
      }
      spellbookService.selectedCharacter.knownSpells[level].spells.push(spell.name);
    } else {
      if (!spellbookService.selectedCharacter.preparedSpells) {
        spellbookService.selectedCharacter.preparedSpells = {};
      }
      if (!spellbookService.selectedCharacter.preparedSpells[level]) {
        spellbookService.selectedCharacter.preparedSpells[level] = {
          spells: []
        };
      }
      spellbookService.selectedCharacter.preparedSpells[level].spells.push({name: spell.name});
    }
    spellbookService.saveCharacters();
    console.log(spellbookService.selectedCharacter);
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
