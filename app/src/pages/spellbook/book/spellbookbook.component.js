"use strict";

function SpellbookBookController($log, $state, $scope, notificationService, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellbookBookController create');
  const ctrl = this;
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    if (spellbookService.selectedCharacter) {
      ctrl.prepared = spellbookService.selectedCharacter.prepared;
      ctrl.book = spellbookService.selectedCharacter.book;
      Object.entries(ctrl.book).forEach(function(pair) {
        pair[1].sort();
        const unique = [];
        ctrl.book[pair[0]] = pair[1].filter((spell) => {
          const result = !unique.includes(spell);
          unique.push(spell);
          return result;
        });
      });
    } else {
      $state.go('spellbook.characters');
    }
    spellbookService.saveCharacters();
    calculateTotal();
  }

  ctrl.chooseSpell = function(spell) {
    spellService.showSpell(spell);
  }

  ctrl.delete = function(key, id) {
    $log.debug("SpellbookBookController ctrl.delete", key, id);
    spellbookService.selectedCharacter.book[key].splice(id, 1);
    spellbookService.saveCharacters();
    calculateTotal();
  }

  ctrl.addSpell = function(level, spell) {
    console.log(level, spell);
    if (!spellbookService.selectedCharacter.prepared) {
      if (!spellbookService.selectedCharacter.knownSpells) {
        spellbookService.selectedCharacter.knownSpells = {};
      }
      if (!spellbookService.selectedCharacter.knownSpells[level]) {
        spellbookService.selectedCharacter.knownSpells[level] = {
          spells: []
        };
      }
      spellbookService.selectedCharacter.knownSpells[level].spells.push(spell);
    } else {
      if (!spellbookService.selectedCharacter.preparedSpells) {
        spellbookService.selectedCharacter.preparedSpells = {};
      }
      if (!spellbookService.selectedCharacter.preparedSpells[level]) {
        spellbookService.selectedCharacter.preparedSpells[level] = {
          spells: []
        };
      }
      spellbookService.selectedCharacter.preparedSpells[level].spells.push({name:spell});
    }
    spellbookService.saveCharacters();
    console.log(spellbookService.selectedCharacter);
  }

  ctrl.isSpellPrepared = function(spellName) {
    if (!spellbookService.selectedCharacter.prepared) {
      if (spellbookService.selectedCharacter.knownSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.knownSpells).reduce(
          (acc, curr) => acc || curr[1].spells.reduce((acc2, curr2) => acc2 || (curr2 == spellName), false), false);
        return present;
      }
    } else {
      if (spellbookService.selectedCharacter.preparedSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.preparedSpells).reduce(
          (acc, curr) => acc + curr[1].spells.reduce((acc2, curr2) => acc2 + (curr2.name == spellName?1:0), 0), 0);
        return present;
      }
    }
    return false;
  }

  function calculateTotal() {
    ctrl.total = Object.entries(ctrl.book).reduce(function(total, pair) {
      return total + (pair[1].length);
    }, 0);
  }

}

const SpellbookBookComponent = {
  template: require('./spellbookbook.html'),
  controller: [
    '$log',
    '$state',
    '$scope',
    'notificationService',
    'filterService',
    'spellService',
    'spellbookService',
    'CLASSES',
    SpellbookBookController
  ],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default SpellbookBookComponent;
