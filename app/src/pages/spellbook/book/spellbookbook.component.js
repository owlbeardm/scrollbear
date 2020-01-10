function SpellbookBookController(
  $log,
  $rootScope,
  $state,
  characterService,
  spellbookService,
  spellService,
) {
  $log.debug('SpellbookBookController create');
  const ctrl = this;

  function calculateTotal() {
    ctrl.total = Object.entries(ctrl.book).reduce((total, pair) => total + (pair[1].length), 0);
  }


  function addSpell(lvlToAdd, spell, spellToAdd) {
    $log.debug('addSpell 1', spellToAdd, spell);
    spellbookService.addSpell(spell, spellToAdd, undefined, lvlToAdd);
  }

  ctrl.$onInit = () => {
    $log.debug('AppController init');
    if (characterService.getSelectedCharacter()) {
      ctrl.prepared = characterService.getSelectedCharacter().prepared;
      ctrl.book = characterService.getSelectedCharacter().book;
      Object.entries(ctrl.book).forEach((pair) => {
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
    characterService.persist();
    calculateTotal();
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell);
  };

  ctrl.delete = (key, id) => {
    $log.debug('SpellbookBookController ctrl.delete', key, id);
    characterService.getSelectedCharacter().book[key].splice(id, 1);
    characterService.persist();
    calculateTotal();
  };

  ctrl.addSpell = (lvlToAdd, spell) => {
    $log.debug('ctrl.addSpell', ctrl.collapseName, spell);
    const spellToAdd = {
      name: spell,
    };
    addSpell(lvlToAdd, spell, spellToAdd);
  };

  ctrl.addSpellAsDomain = (lvlToAdd, spell) => {
    $log.debug('ctrl.addSpellAsDomain', spell);
    const spellToAdd = {
      name: spell,
      domain: true,
    };
    addSpell(lvlToAdd, spell, spellToAdd);
  };

  ctrl.addSpellAsSpecial = (lvlToAdd, spell) => {
    $log.debug('ctrl.addSpellAsSpecial', spell);
    const spellToAdd = {
      name: spell,
      special: true,
    };
    addSpell(lvlToAdd, spell, spellToAdd);
  };

  ctrl.isSpellPrepared = (spellName) => {
    if (!characterService.getSelectedCharacter().prepared) {
      if (characterService.getSelectedCharacter().knownSpells) {
        const present = Object.entries(characterService.getSelectedCharacter().knownSpells).reduce(
          (acc, curr) => acc || curr[1].spells.reduce((acc2, curr2) => acc2 || (curr2.name === spellName), false),
          false,
        );
        return present;
      }
    } else if (characterService.getSelectedCharacter().preparedSpells) {
      const present = Object.entries(characterService.getSelectedCharacter().preparedSpells).reduce(
        (acc, curr) => acc + curr[1].spells.reduce((acc2, curr2) => acc2 + (curr2.name === spellName ? 1 : 0), 0),
        0,
      );
      return present;
    }
    return false;
  };
}

const SpellbookBookComponent = {
  template: require('./spellbookbook.html'),
  controller: [
    '$log',
    '$rootScope',
    '$state',
    'characterService',
    'spellbookService',
    'spellService',
    SpellbookBookController,
  ],
  bindings: {
    spells: '<',
    className: '<',
  },
};

export default SpellbookBookComponent;
