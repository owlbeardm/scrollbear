function MainController(
  notificationService,
  filterService,
  spellService,
  $window,
  $timeout,
  $state,
  $scope,
  $rootScope,
  $log,
  CLASSES,
) {
  $log.debug('MainController create');
  const ctrl = this;

  function getSpells() {
    ctrl.otherSpellsCount = 0;
    const allSells = spellService.getSpellsSplited();
    ctrl.total = Object.entries(allSells).reduce((total, pair) => total + (pair[1].length), 0);
    if (!ctrl.total) {
      ctrl.otherSpellsCount = spellService.getSpellsCountByFilter();
    }
    return allSells;
  }

  const {
    localStorage,
  } = $window;
  const SELECTED_CLASS = 'SELECTED_CLASS';

  ctrl.$onInit = () => {
    $log.debug('AppController init');
    ctrl.classes = CLASSES;
    const selectedClass = JSON.parse(localStorage.getItem(SELECTED_CLASS));
    ctrl.classSelected = (selectedClass && CLASSES[selectedClass])
      ? selectedClass
      : 'wizard';
    ctrl.setClass();
    notificationService.subscribe($scope, notificationService.FILTER_CHANGED, () => {
      ctrl.spells = getSpells();
    });
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.search = () => {
    $log.debug('AppController ctrl.search', ctrl.filter);
    ctrl.spells = getSpells();
  };

  ctrl.setClass = () => {
    spellService.setClass(ctrl.classSelected);
    localStorage.setItem(SELECTED_CLASS, JSON.stringify(ctrl.classSelected));
    ctrl.search();
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.classToAll = () => {
    ctrl.classSelected = 'all';
    ctrl.setClass();
  };
}

const MainComponent = {
  template: require('./main.html'),
  controller: [
    'notificationService',
    'filterService',
    'spellService',
    '$window',
    '$timeout',
    '$state',
    '$scope',
    '$rootScope',
    '$log',
    'CLASSES',
    MainController,
  ],
};

export default MainComponent;
