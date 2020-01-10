import './spell.css';

function SpellController($log, $rootScope, $state) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    ctrl.root = $rootScope;
    const popup = angular.element('#exampleModal');
    $log.debug('Modal popup', popup);
    popup.on('hidden.bs.modal', () => {
      if ($rootScope.newstate) {
        $state.go($rootScope.newstate);
      } else {
        $state.go('list');
      }
    });
    popup.on('show.bs.modal', () => {
      $log.debug('Modal popup', ctrl.spell);
      ctrl.root = $rootScope;
    });
    popup.modal('show');
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: [
    '$log', '$rootScope', '$state', SpellController,
  ],
  bindings: {
    spell: '<',
    prevstate: '<',
  },
};

export default SpellComponent;
