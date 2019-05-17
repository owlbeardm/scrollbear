"use strict";

function NewCharacterController($log, $rootScope, $state, spellbookService, CLASSES) {
  $log.debug('NewCharacterController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharactersController init");
    ctrl.classes = Object.assign({}, CLASSES);
    delete ctrl.classes.all;
    ctrl.prepared = false;
    ctrl.spellbook = false;
    ctrl.isNameExists = false;
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit', Math.round(performance.now()) - $rootScope.onStartTime, $state.current.name);
    }
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
  controller: ['$log', '$rootScope', '$state', 'spellbookService', 'CLASSES', NewCharacterController]
}

export default NewCharacterComponent;
