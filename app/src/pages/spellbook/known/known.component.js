function KnownController($log, $rootScope, $state, characterService, spellbookService) {
  const ctrl = this;
  $log.debug('KnownController create');

  function calculateTotal() {
    ctrl.total = Object.entries(ctrl.spells).reduce((total, pair) => total + (pair[1].spells.length), 0);
  }

  ctrl.$onInit = () => {
    $log.debug('KnownController init');
    if (characterService.getSelectedCharacter()) {
      if (!characterService.getSelectedCharacter().knownSpells) {
        characterService.getSelectedCharacter().knownSpells = {};
      }
      ctrl.spells = characterService.getSelectedCharacter().knownSpells;
      Object.entries(ctrl.spells).forEach((pair) => {
        if (!pair[1].spells) {
          pair[1].spells = [];
        }
        if (!pair[1].cast) {
          pair[1].cast = 0;
        }
        if (!pair[1].perDay) {
          pair[1].perDay = 0;
        }
        if (!pair[1].known) {
          pair[1].known = 0;
        }
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
    characterService.persist();
    calculateTotal();
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.resetCast = () => {
    spellbookService.resetCast();
  };
}

const KnownComponent = {
  template: require('./known.html'),
  controller: [
    '$log',
    '$rootScope',
    '$state',
    'characterService',
    'spellbookService',
    KnownController,
  ],
  bindings: {
    spells: '<',
    className: '<',
  },
};

export default KnownComponent;
