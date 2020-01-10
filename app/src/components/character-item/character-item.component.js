function CharacterItemController($log, $state, characterService, CLASSES) {
  $log.debug('CharacterItemController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('CharacterItemController init');
    ctrl.classes = CLASSES;
  };

  ctrl.delete = () => {
    characterService.deleteCharacter(ctrl.id);
    ctrl.deleteMode = false;
  };

  ctrl.characterSelected = () => ctrl.characters.indexOf(characterService.getSelectedCharacter());

  ctrl.selectCharacter = (character) => {
    characterService.selectCharacter(character);
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
  controller: ['$log', '$state', 'characterService', 'CLASSES', CharacterItemController],
  bindings: {
    character: '<',
    selected: '<',
    id: '<',
  },
};

export default CharacterItemComponent;
