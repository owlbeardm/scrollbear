function SpellListLightController(
  $log,
  $state,
  $scope,
  $rootScope,
  $timeout,
  filterService,
  spellService,
  $window,
  $document,
) {
  $log.debug('SpellListLightController create');
  const ctrl = this;

  function redrawFavList() {
    ctrl.favL = [];
    ctrl.spellsL.forEach((spell) => {
      ctrl.favL.push(ctrl.isFav(spell));
    });
  }

  ctrl.$onInit = () => {
    $log.debug('SpellListLightController init');
    angular.element($window).bind('scroll', () => {
      ctrl.redraw();
    });
    angular.element($window).bind('resize', () => {
      ctrl.redraw();
    });
  };

  ctrl.$onChanges = () => {
    ctrl.elementHeight = ctrl.spells.length * 43;
    ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
  };

  ctrl.$doCheck = () => {
    ctrl.collapse = angular.element(`#${ctrl.collapseName}`);
    if (ctrl.collapse.attr('class')) {
      ctrl.classes = ctrl.collapse.attr('class').split(' ');
      ctrl.scroll = $document.scrollTop();
      ctrl.offsetTop = angular.element(`#list-new-${ctrl.collapseName}`).offset();
      if (ctrl.offsetTop && ctrl.scroll > ctrl.offsetTop.top + ctrl.spells.length * 43) {
        return;
      }
      ctrl.elementHeight = ctrl.spells.length * 43;
      ctrl.height = $window.innerHeight;
      if (ctrl.offsetTop) {
        if (ctrl.scroll > ctrl.offsetTop.top + ctrl.spells * 43) {
          return;
        }
        const elements = ctrl.height / 43 + 2;
        const start = Math.min(
          Math.max(0, Math.floor((ctrl.scroll - ctrl.offsetTop.top) / 43)),
          ctrl.spells.length,
        );
        if (elements !== ctrl.elements || start !== ctrl.start) {
          ctrl.start = start;
          ctrl.elements = elements;
          ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
          redrawFavList();
        }
      }
    }
  };

  ctrl.redraw = () => {
    ctrl.$doCheck();
    $scope.$digest();
  };

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell.name);
  };

  ctrl.isFav = (spell) => filterService.isFav(spell);

  ctrl.changeFav = (spell) => {
    filterService.changeFav(spell);
    redrawFavList();
  };
}

const SpellListLightComponent = {
  template: require('./spell-list-light.html'),
  controller: [
    '$log',
    '$state',
    '$scope',
    '$rootScope',
    '$timeout',
    'filterService',
    'spellService',
    '$window',
    '$document',
    SpellListLightController,
  ],
  bindings: {
    spells: '<',
    collapseName: '<',
  },
};

export default SpellListLightComponent;
