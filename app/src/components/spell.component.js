"use strict";

function SpellController($rootScope, $log) {
  $log.debug('SpellController create');
  const ctrl = this;
  ctrl.rootScope = $rootScope;
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: [
    '$rootScope', '$log', SpellController
  ]
}

export default SpellComponent;
