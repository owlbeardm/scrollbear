"use strict";

function SpellbookController($log, spellbookService) {
  $log.debug('SpellbookController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellbookController init");
  }

  ctrl.selectedCharacter = function() {
    return spellbookService.selectedCharacter;
  }
}

const SpellbookComponent = {
  template: require('./spellbook.html'),
  controller: [
    '$log',
    'spellbookService',
    SpellbookController
  ]
}

export default SpellbookComponent;
