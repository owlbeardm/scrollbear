"use strict";

import './spell.css';

function SpellController($log, $rootScope, $state) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    ctrl.root = $rootScope;
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      if ($rootScope.newstate)
        $state.go($rootScope.newstate);
      else
        $state.go('list');
      }
    );
    popup.on("show.bs.modal", function() {
      $log.debug('Modal popup', ctrl.spell);
      ctrl.root = $rootScope;
    });
    popup.modal('show');
  }
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: [
    '$log', '$rootScope', '$state', SpellController
  ],
  bindings: {
    spell: '<',
    prevstate: '<'
  }
}

export default SpellComponent;
