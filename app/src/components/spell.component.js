"use strict";

function SpellController($log) {
  $log.debug('SpellController create');
  const ctrl = this;
}

const SpellComponent = {
  template: require('./spell.html'),
  controller: [
    '$log', SpellController
  ],
  bindings: {
    spell: '<',
  }
}

export default SpellComponent;
