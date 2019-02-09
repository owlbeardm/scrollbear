"use strict";

function CharactersController($log, $state, spellbookService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharactersController init");
    ctrl.classes = CLASSES;
    ctrl.characters = spellbookService.characters;
  }

  ctrl.delete = function(id) {
    $log.debug("CharactersController delete", id);
    spellbookService.deleteCharacter(id);
    ctrl.characters = spellbookService.characters;
  }

  ctrl.add = function() {
    $state.go('spellbook.newcharacter');
  }

  ctrl.characterSelected = function() {
    return ctrl.characters.indexOf(spellbookService.selectedCharacter);
  }

  ctrl.selectCharacter = function(character) {
    spellbookService.selectCharacter(character);
    if (character.prepared) {
      $state.go('spellbook.prepared');
    } else {
      $state.go('spellbook.known');
    }
  }

}

const CharactersComponent = {
  template: require('./characters.html'),
  controller: ['$log', '$state', 'spellbookService', 'CLASSES', CharactersController]
}

export default CharactersComponent;
