function CharacterItemController($log, $state, spellbookService, CLASSES) {
  $log.debug('CharacterItemController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('CharacterItemController init');
    ctrl.classes = CLASSES;
  };

  ctrl.delete = () => {
    spellbookService.deleteCharacter(ctrl.id);
    ctrl.deleteMode = false;
  };

  ctrl.characterSelected = () => ctrl.characters.indexOf(spellbookService.selectedCharacter);

  ctrl.selectCharacter = (character) => {
    spellbookService.selectCharacter(character);
    if (character.prepared) {
      $state.go('spellbook.prepared');
    } else {
      $state.go('spellbook.known');
    }
  };

  ctrl.startDelete = () => {
    ctrl.deleteMode = true;
  };

  ctrl.cancelDelete = () => {
    ctrl.deleteMode = false;
  };
}

const CharacterItemComponent = {
  template: require('./character-item.html'),
  controller: ['$log', '$state', 'spellbookService', 'CLASSES', CharacterItemController],
  bindings: {
    character: '<',
    selected: '<',
    id: '<',
  },
};

export default CharacterItemComponent;
