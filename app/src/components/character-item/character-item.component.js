"use strict";

function CharacterItemController($log, $state, spellbookService, CLASSES) {
  $log.debug('CharacterItemController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharacterItemController init");
    ctrl.classes = CLASSES;
  }

  ctrl.delete = function() {
    spellbookService.deleteCharacter(ctrl.id);
    ctrl.deleteMode = false;
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

  ctrl.startDelete = function() {
    ctrl.deleteMode = true;
  }

  ctrl.cancelDelete = function() {
    ctrl.deleteMode = false;
  }

}

const CharacterItemComponent = {
  template: require('./character-item.html'),
  controller: ['$log', '$state', 'spellbookService', 'CLASSES', CharacterItemController],
  bindings: {
    character: '<',
    selected: '<',
    id: '<'
  }
}

export default CharacterItemComponent;
