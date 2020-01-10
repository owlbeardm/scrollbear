function SpellListController(
  $log,
  $state,
  $rootScope,
  $scope,
  $timeout,
  filterService,
  spellService,
  CLASSES,
  $window,
  $document,
) {
  $log.debug('SpellListController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('SpellListController init');
    ctrl.classesC = CLASSES;
  };

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell.name);
  };

  ctrl.isFav = (spell) => filterService.isFav(spell);

  ctrl.changeFav = (spell) => {
    filterService.changeFav(spell);
  };

  ctrl.click = () => {
    const top = $document.scrollTop(); // angular.element('#heading' + name).offset().top;
    $timeout($document.scrollTop(top));
  };
}

const SpellListComponent = {
  template: require('./spell-list.html'),
  controller: [
    '$log',
    '$state',
    '$rootScope',
    '$scope',
    '$timeout',
    'filterService',
    'spellService',
    'CLASSES',
    '$window',
    '$document',
    SpellListController,
  ],
  bindings: {
    spells: '<',
    className: '<',
  },
};

export default SpellListComponent;
