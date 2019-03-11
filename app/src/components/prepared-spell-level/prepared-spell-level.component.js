"use strict";

function PreparedSpelLevelController($log, $state, filterService, focusService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("PreparedSpelLevelController init");
  }

  ctrl.cast = function(key, id) {
    spellbookService.selectedCharacter.preparedSpells[key].spells[id].cast = true;
    spellbookService.saveCharacters();
  }

  ctrl.delete = function(key, id) {
    $log.debug("SpellbookBookController ctrl.delete", key, id);
    spellbookService.selectedCharacter.preparedSpells[key].spells.splice(id, 1);
    spellbookService.saveCharacters();
  }

  ctrl.edit = function() {
    ctrl.perDay = ctrl.spellLevel.perDay;
    ctrl.known = ctrl.spellLevel.known;
    ctrl.editMode = true;
    focusService.setFocus('perDay');
  }

  ctrl.saveEdit = function() {
    ctrl.spellLevel.perDay = ctrl.perDay;
    ctrl.spellLevel.known = ctrl.known;
    ctrl.editMode = false;
    spellbookService.saveCharacters();
  }

  ctrl.cancelEdit = function() {
    ctrl.editMode = false;
  }

  ctrl.castSpells = function() {
    return ctrl.spellLevel.spells.reduce((acc, curr) => acc + (
      curr.cast
      ? 1
      : 0), 0);
  }

  ctrl.chooseSpell = function(spell) {
    const spell_url = spellService.spellNameToUrl(spell);
    $state.go('spells', {spellUrl: spell_url});
  }

}

const PreparedSpelLevelComponent = {
  template: require('./prepared-spell-level.html'),
  controller: [
    '$log',
    '$state',
    'filterService',
    'focusService',
    'spellService',
    'spellbookService',
    'CLASSES',
    PreparedSpelLevelController
  ],
  bindings: {
    spellLevel: '<',
    level: '<',
    index: '<'
  }
}

export default PreparedSpelLevelComponent;
