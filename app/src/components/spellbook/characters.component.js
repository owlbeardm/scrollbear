"use strict";

function CharactersController($log, $state, spellbookService, CLASSES) {
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

  ctrl.add = function() {
    ctrl.characters.push({
      name: 'newName' + Date.now()
    })
    $state.go('spellbook.newcharacter');
  }

  ctrl.characterSelected = function() {
    return spellbookService.characterSelected();
  }

}

const CharactersComponent = {
  template: require('./characters.html'),
  controller: [
    '$log',
    '$state',
    'spellbookService',
    'CLASSES',
    CharactersController
  ]
}

export default CharactersComponent;
