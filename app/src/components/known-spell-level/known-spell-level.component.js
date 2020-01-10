function KnownSpelLevelController(
  $log,
  characterService,
  focusService,
  spellService,
  spellbookService,
) {
  $log.debug('KnownSpelLevelController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('KnownSpelLevelController init');
  };

  ctrl.cast = (key, name) => {
    $log.debug('KnownSpelLevelController cast', key);
    spellbookService.spontaneousCast(key, name);
  };

  ctrl.restoreSlot = (key) => {
    spellbookService.spontaneousRestore(key);
  };

  ctrl.delete = (key, id) => {
    $log.debug('SpellbookBookController ctrl.delete', key, id);
    characterService.getSelectedCharacter().knownSpells[key].spells.splice(id, 1);
    characterService.persist();
  };

  ctrl.edit = () => {
    ctrl.perDay = ctrl.spellLevel.perDay;
    ctrl.known = ctrl.spellLevel.known;
    ctrl.editMode = true;
    focusService.setFocus('known');
  };

  ctrl.saveEdit = () => {
    ctrl.spellLevel.perDay = ctrl.perDay;
    ctrl.spellLevel.known = ctrl.known;
    ctrl.editMode = false;
    characterService.persist();
  };

  ctrl.cancelEdit = () => {
    ctrl.editMode = false;
  };

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell.name);
  };

  ctrl.filteredLabels = (labels) => labels
    .filter((x) => !!x)
    .map((x) => x.replace(' spell', ''))
    .sort();
}

const KnownSpelLevelComponent = {
  template: require('./known-spell-level.html'),
  controller: [
    '$log',
    'characterService',
    'focusService',
    'spellService',
    'spellbookService',
    KnownSpelLevelController,
  ],
  bindings: {
    spellLevel: '<',
    level: '<',
    index: '<',
  },
};

export default KnownSpelLevelComponent;
