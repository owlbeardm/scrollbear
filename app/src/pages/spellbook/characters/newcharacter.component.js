"use strict";

function NewCharacterController($log, $state, spellbookService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharactersController init");
    ctrl.classes = Object.assign({}, CLASSES);
    delete ctrl.classes.all;
    ctrl.prepared = false;
    ctrl.spellbook = false;
    ctrl.isNameExists = false;
  }

  ctrl.add = function() {
    const character = {
      "name": ctrl.name,
      "prepared": ctrl.prepared,
      "spellbook": ctrl.spellbook,
      "class": ctrl.classSelected
    };
    spellbookService.addCharacter(character);
    spellbookService.selectCharacter(character);
    if (character.prepared) {
      $state.go('spellbook.prepared');
    } else {
      $state.go('spellbook.known');
    }
  }

  ctrl.goBack = function() {
    $state.go('spellbook.characters');
  }

  ctrl.checkIfNameExists = function() {
    ctrl.isNameExists = spellbookService.isNameExists(ctrl.name);
  }

}

const NewCharacterComponent = {
  template: require('./newcharacter.html'),
  controller: ['$log', '$state', 'spellbookService', 'CLASSES', NewCharacterController]
}

export default NewCharacterComponent;
