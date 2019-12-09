function NewCharacterController($log, $rootScope, $state, spellbookService, CLASSES) {
  $log.debug('NewCharacterController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('CharactersController init');
    ctrl.classes = { ...CLASSES };
    delete ctrl.classes.all;
    ctrl.prepared = false;
    ctrl.spellbook = false;
    ctrl.isNameExists = false;
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.add = () => {
    const character = {
      name: ctrl.name,
      prepared: ctrl.prepared,
      spellbook: ctrl.spellbook,
      class: ctrl.classSelected,
    };
    spellbookService.addCharacter(character);
    spellbookService.selectCharacter(character);
    if (character.prepared) {
      $state.go('spellbook.prepared');
    } else {
      $state.go('spellbook.known');
    }
  };

  ctrl.goBack = () => {
    $state.go('spellbook.characters');
  };

  ctrl.checkIfNameExists = () => {
    ctrl.isNameExists = spellbookService.isNameExists(ctrl.name);
  };
}

const NewCharacterComponent = {
  template: require('./newcharacter.html'),
  controller: ['$log', '$rootScope', '$state', 'spellbookService', 'CLASSES', NewCharacterController],
};

export default NewCharacterComponent;
