"use strict";

function SpellController($log, $rootScope, $state) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $state.go('main');
    });

  }

  ctrl.dd = function() {
    $log.debug('ctrl.dd');
    return $rootScope.spellDescription;
  }

  ctrl.getDescripters = function() {
    let view = '[';
    for (let i = 0; i < $rootScope.spell.descripters.length; i++) {
      view = view + (
        (i != 0)
        ? ', '
        : '') + $rootScope.spell.descripters[i];
    }

    return view + ']';
  }

}

const SpellComponent = {
  template: require('./spell.html'),
  controller: ['$log', '$rootScope', '$state', SpellController]
}

export default SpellComponent;
