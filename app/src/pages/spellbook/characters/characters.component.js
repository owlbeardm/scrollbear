function CharactersController($log, $rootScope, $state, characterService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('CharactersController init');
    ctrl.classes = CLASSES;
    ctrl.characters = characterService.getCharacters();
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.add = () => {
    $state.go('spellbook.newcharacter');
  };

  ctrl.characterSelected = () => ctrl.characters.indexOf(characterService.getSelectedCharacter());
}

const CharactersComponent = {
  template: require('./characters.html'),
  controller: ['$log', '$rootScope', '$state', 'characterService', 'CLASSES', CharactersController],
};

export default CharactersComponent;
