"use strict";

function SpellController($log, $rootScope, $state) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      if ($rootScope.newstate)
        $state.go($rootScope.newstate);
      else
        $state.go('main');
    });
  }
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: ['$log', '$rootScope', '$state', SpellController],
  bindings: {
    prevstate: '<'
  }
}

export default SpellComponent;
