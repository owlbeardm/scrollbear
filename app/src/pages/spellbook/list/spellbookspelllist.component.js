function SpellbookSpellListController(
  $log,
  $state,
  $rootScope,
  $scope,
  $document,
  $timeout,
  notificationService,
  spellService,
  characterService,
  CLASSES,
) {
  const ctrl = this;
  $log.debug('SpellbookSpellListController create');

  function getSpells() {
    ctrl.otherSpellsCount = 0;
    const allSells = spellService.getSpellsSplited();
    ctrl.total = Object.entries(allSells).reduce((total, pair) => total + (pair[1].length), 0);
    if (!ctrl.total) {
      ctrl.otherSpellsCount = spellService.getSpellsCountByFilter();
    }
    return allSells;
  }

  ctrl.$onInit = () => {
    $log.debug('SpellbookSpellListController init');
    if (!characterService.getSelectedCharacter()) {
      $state.go('spellbook.characters');
    }
    ctrl.classes = CLASSES;
    ctrl.classSelected = characterService.getSelectedCharacter().class;
    ctrl.setClass();
    notificationService.subscribe($scope, notificationService.FILTER_CHANGED, () => {
      ctrl.spells = getSpells();
    });
    notificationService.subscribe($scope, notificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED, (event, param) => {
      $log.debug('SpellbookSpellListController notificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED', param);
      if (param) {
        ctrl.classSelected = characterService.getSelectedCharacter().class;
        ctrl.setClass();
      } else {
        ctrl.classToAll();
      }
    });
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell.name);
  };

  ctrl.search = () => {
    $log.debug('SpellbookSpellListController ctrl.search', ctrl.filter);
    ctrl.spells = getSpells();
  };

  ctrl.setClass = () => {
    $log.debug('SpellbookSpellListController ctrl.search', ctrl.classSelected);
    spellService.setClass(ctrl.classSelected);
    ctrl.search();
  };

  ctrl.classToAll = () => {
    ctrl.classSelected = 'all';
    ctrl.setClass();
  };

  ctrl.click = () => {
    const top = $document.scrollTop(); // angular.element('#heading' + name).offset().top;
    $timeout($document.scrollTop(top));
  };
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
    'spellService',
    'characterService',
    'CLASSES',
    SpellbookSpellListController,
  ],
  bindings: {
    spells: '<',
    className: '<',
  },
};

export default SpellbookSpellListComponent;
