function CharactersController($log, $rootScope, $state, spellbookService, CLASSES) {
  $log.debug('CharactersController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('CharactersController init');
    ctrl.classes = CLASSES;
    ctrl.characters = spellbookService.characters;
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };

  ctrl.add = () => {
    $state.go('spellbook.newcharacter');
  };

  ctrl.characterSelected = () => ctrl.characters.indexOf(spellbookService.selectedCharacter);
}

const CharactersComponent = {
  template: require('./characters.html'),
  controller: ['$log', '$rootScope', '$state', 'spellbookService', 'CLASSES', CharactersController],
};

export default CharactersComponent;
