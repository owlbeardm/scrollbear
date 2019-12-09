function SpellbookBookController(
  $log,
  $rootScope,
  $state,
  $scope,
  notificationService,
  filterService,
  spellService,
  spellbookService,
) {
  $log.debug('SpellbookBookController create');
  const ctrl = this;

  function calculateTotal() {
    ctrl.total = Object.entries(ctrl.book).reduce((total, pair) => total + (pair[1].length), 0);
  }

  function addSpell(lvlToAdd, spell, spellToAdd) {
    $log.debug('addSpell 1', spellToAdd, spell);
    const level = lvlToAdd;
    if (!spellbookService.selectedCharacter.prepared) {
      if (!spellbookService.selectedCharacter.knownSpells) {
        spellbookService.selectedCharacter.knownSpells = {};
      }
      if (!spellbookService.selectedCharacter.knownSpells[level]) {
        spellbookService.selectedCharacter.knownSpells[level] = {
          spells: [],
        };
      }
      spellbookService.selectedCharacter.knownSpells[level].spells.push(spellToAdd);
    } else {
      if (!spellbookService.selectedCharacter.preparedSpells) {
        spellbookService.selectedCharacter.preparedSpells = {};
      }
      if (!spellbookService.selectedCharacter.preparedSpells[level]) {
        spellbookService.selectedCharacter.preparedSpells[level] = {
          spells: [],
        };
      }
      spellbookService.selectedCharacter.preparedSpells[level].spells.push(spellToAdd);
    }
    spellbookService.saveCharacters();
    $log.debug(spellbookService.selectedCharacter);
    if (!spellbookService.selectedCharacter.prepared) {
      ga('send', 'event', 'known_add', spellToAdd.name, spellbookService.selectedCharacter.class);
    } else {
      ga('send', 'event', 'prepared_add', spellToAdd.name, spellbookService.selectedCharacter.class);
    }
  }

  ctrl.$onInit = () => {
    $log.debug('AppController init');
    if (spellbookService.selectedCharacter) {
      ctrl.prepared = spellbookService.selectedCharacter.prepared;
      ctrl.book = spellbookService.selectedCharacter.book;
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
    spellbookService.saveCharacters();
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
    spellbookService.selectedCharacter.book[key].splice(id, 1);
    spellbookService.saveCharacters();
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
    if (!spellbookService.selectedCharacter.prepared) {
      if (spellbookService.selectedCharacter.knownSpells) {
        const present = Object.entries(spellbookService.selectedCharacter.knownSpells).reduce(
          (acc, curr) => acc || curr[1].spells.reduce((acc2, curr2) => acc2 || (curr2.name === spellName), false),
          false,
        );
        return present;
      }
    } else if (spellbookService.selectedCharacter.preparedSpells) {
      const present = Object.entries(spellbookService.selectedCharacter.preparedSpells).reduce(
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
    '$scope',
    'notificationService',
    'filterService',
    'spellService',
    'spellbookService',
    SpellbookBookController,
  ],
  bindings: {
    spells: '<',
    className: '<',
  },
};

export default SpellbookBookComponent;
