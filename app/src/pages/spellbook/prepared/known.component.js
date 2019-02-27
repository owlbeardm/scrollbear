"use strict";

function KnownController($log, $state, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("KnownController init");
    if (spellbookService.selectedCharacter) {
      if (!spellbookService.selectedCharacter.knownSpells) {
        spellbookService.selectedCharacter.knownSpells = {};
      }
      ctrl.spells = spellbookService.selectedCharacter.knownSpells;
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
      pair[1].cast = 0
    });
    spellbookService.saveCharacters();
  }
}

const KnownComponent = {
  template: require('./known.html'),
  controller: [
    '$log',
    '$state',
    'filterService',
    'spellService',
    'spellbookService',
    'CLASSES',
    KnownController
  ],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default KnownComponent;
