"use strict";

function PreparedController($log, $state, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("PreparedController init");
    if (spellbookService.selectedCharacter) {
      if (!spellbookService.selectedCharacter.preparedSpells) {
        spellbookService.selectedCharacter.preparedSpells = {};
      }
      ctrl.spells = spellbookService.selectedCharacter.preparedSpells;
      Object.entries(ctrl.spells).forEach(function(pair) {
        if (!pair[1].spells) {
          pair[1].spells = []
        };
        if (!pair[1].cast) {
          pair[1].cast = 0
        };
        if (!pair[1].perDay) {
          pair[1].perDay = 0
        };
        if (!pair[1].known) {
          pair[1].known = 0
        };
        pair[1].spells.sort();
        const unique = [];
        pair[1].spells = pair[1].spells.filter((spell) => {
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

  ctrl.cast = function(key) {
    spellbookService.selectedCharacter.knownSpells[key].cast++;
    spellbookService.saveCharacters();
  }

  ctrl.delete = function(key, id) {
    $log.debug("SpellbookBookController ctrl.delete", key, id);
    spellbookService.selectedCharacter.knownSpells[key].spells.splice(id, 1);
    spellbookService.saveCharacters();
  }

  ctrl.resetCast = function() {
    Object.entries(ctrl.spells).forEach(function(pair) {
      pair[1].spells.forEach(function(spell) {
        delete  spell.cast;
      });
    });
    spellbookService.saveCharacters();
  }

  function calculateTotal() {
    ctrl.total = Object.entries(ctrl.spells).reduce(function(total, pair) {
      return total + (pair[1].spells.length);
    }, 0);
  }
}

const PreparedComponent = {
  template: require('./prepared.html'),
  controller: [
    '$log',
    '$state',
    'filterService',
    'spellService',
    'spellbookService',
    'CLASSES',
    PreparedController
  ],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default PreparedComponent;