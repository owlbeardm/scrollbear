"use strict";

function CharactersController($log, $state, spellbookService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharactersController init");
    ctrl.classes = CLASSES;
    ctrl.characters = spellbookService.characters;
  }

  ctrl.add = function() {
    $state.go('spellbook.newcharacter');
  }

  ctrl.characterSelected = function() {
    return ctrl.characters.indexOf(spellbookService.selectedCharacter);
  }

}

const CharactersComponent = {
  template: require('./characters.html'),
  controller: ['$log', '$state', 'spellbookService', 'CLASSES', CharactersController]
}

export default CharactersComponent;
