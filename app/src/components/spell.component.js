"use strict";

function SpellController($log, $rootScope) {
  $log.debug('SpellController create');
  const ctrl = this;
  ctrl.rootScope = $rootScope;

  ctrl.$onInit = function() {
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $state.go('main');
    });
  }

  ctrl.getDescripters = function() {
    let view = '[';
    for (let i = 0; i < ctrl.rootScope.spell.descripters.length; i++) {
      view = view + (
        (i != 0)
        ? ', '
        : '') + ctrl.rootScope.spell.descripters[i];
    }
    return view + ']';
  }
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: ['$log', '$rootScope', SpellController]
}

export default SpellComponent;
