function SpellbookController($log, spellbookService) {
  $log.debug('SpellbookController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('SpellbookController init', spellbookService.selectedCharacter);
  };

  ctrl.selectedCharacter = () => spellbookService.selectedCharacter;
}

const SpellbookComponent = {
  template: require('./spellbook.html'),
  controller: [
    '$log',
    'spellbookService',
    SpellbookController,
  ],
};

export default SpellbookComponent;
