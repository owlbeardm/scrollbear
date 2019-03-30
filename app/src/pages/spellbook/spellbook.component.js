"use strict";

function SpellbookController($log, spellbookService) {
  $log.debug('SpellbookController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellbookController init", spellbookService.selectedCharacter);
  }

  ctrl.selectedCharacter = function() {
    $log.debug("SpellbookController ctrl.selectedCharacter");
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
