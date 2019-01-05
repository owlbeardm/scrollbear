"use strict";

function SpellController($log, $rootScope) {
  $log.debug('SpellController create');
  const ctrl = this;
  ctrl.rootScope = $rootScope;
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: ['$log', '$rootScope', SpellController]
}

export default SpellComponent;
