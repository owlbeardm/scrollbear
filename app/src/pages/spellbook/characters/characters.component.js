"use strict";

function CharactersController($log, $rootScope, $state, spellbookService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("CharactersController init");
    ctrl.classes = CLASSES;
    ctrl.characters = spellbookService.characters;
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit', Math.round(performance.now()) - $rootScope.onStartTime, $state.current.name);
    }
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
  controller: ['$log', '$rootScope', '$state', 'spellbookService', 'CLASSES', CharactersController]
}

export default CharactersComponent;
