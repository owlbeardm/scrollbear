"use strict";

function SpellbookController($log) {
  $log.debug('SpellbookController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellbookController init");

  }

}

const SpellbookComponent = {
  template: require('./spellbook.html'),
  controller: [
    '$log',
    SpellbookController
  ]
}

export default SpellbookComponent;
