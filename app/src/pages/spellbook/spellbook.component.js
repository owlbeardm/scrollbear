function SpellbookController($log, characterService) {
  $log.debug('SpellbookController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('SpellbookController init', characterService.getSelectedCharacter());
  };

  ctrl.selectedCharacter = () => characterService.getSelectedCharacter();
}

const SpellbookComponent = {
  template: require('./spellbook.html'),
  controller: [
    '$log',
    'characterService',
    SpellbookController,
  ],
};

export default SpellbookComponent;
