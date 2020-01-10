function PreparedSpelLevelController(
  $log,
  characterService,
  focusService,
  spellService,
  spellbookService,
) {
  const ctrl = this;
  $log.debug('SpellController create');

  ctrl.$onInit = () => {
    $log.debug('PreparedSpelLevelController init', characterService.getSelectedCharacter().preparedSpells);
    characterService.getSelectedCharacter().preparedSpells[ctrl.level].spells.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    characterService.persist();
  };

  ctrl.cast = (key, id) => {
    spellbookService.preparedCast(key, id);
  };

  ctrl.restore = (key, id) => {
    spellbookService.preparedRestore(key, id);
  };

  ctrl.delete = (key, id) => {
    $log.debug('SpellbookBookController ctrl.delete', key, id);
    characterService.getSelectedCharacter().preparedSpells[key].spells.splice(id, 1);
    characterService.persist();
  };

  ctrl.edit = () => {
    ctrl.perDay = ctrl.spellLevel.perDay;
    ctrl.known = ctrl.spellLevel.known;
    ctrl.editMode = true;
    focusService.setFocus('perDay');
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

  ctrl.castSpells = () => ctrl.spellLevel.spells.reduce((acc, curr) => acc + (
    curr.cast
      ? 1
      : 0), 0);

  ctrl.chooseSpell = (spell) => {
    spellService.showSpell(spell);
  };

  ctrl.filteredLabels = (labels) => (labels.filter ? labels
    .filter((x) => !!x)
    .map((x) => x.replace(' spell', ''))
    .sort() : undefined);
}

const PreparedSpelLevelComponent = {
  template: require('./prepared-spell-level.html'),
  controller: [
    '$log',
    'characterService',
    'focusService',
    'spellService',
    'spellbookService',
    PreparedSpelLevelController,
  ],
  bindings: {
    spellLevel: '<',
    level: '<',
    index: '<',
  },
};

export default PreparedSpelLevelComponent;
