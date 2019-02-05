"use strict";

function NewCharacterController($log, $state, spellbookService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharactersController init");
    ctrl.classes = Object.assign({}, CLASSES);
    delete ctrl.classes.all;
    ctrl.characters = [{
      name: 'first'
    }, {
      name: 'second'
    }];
  }

  ctrl.delete = function(id) {
    $log.debug("CharactersController delete", id);

    ctrl.characters.splice(id, 1);
  }

  ctrl.go = function(character) {
    $log.debug("CharactersController go", character);
    if (ctrl.characters.includes(character)) {
      $log.debug("CharactersController go go");
    }
  }

  ctrl.characterSelected = function() {
    return spellbookService.characterSelected();
  }

  ctrl.goBack = function() {
    $state.go('spellbook.characters');
  }

}

const NewCharacterComponent = {
  template: require('./newcharacter.html'),
  controller: [
    '$log',
    '$state',
    'spellbookService',
    'CLASSES',
    NewCharacterController
  ]
}

export default NewCharacterComponent;
