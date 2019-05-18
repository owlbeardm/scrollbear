"use strict";

function KnownSpelLevelController($log, $state, filterService, focusService, spellService, spellbookService, CLASSES) {
  $log.debug('KnownSpelLevelController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("KnownSpelLevelController init");
  }

  ctrl.cast = function(key, name) {
    $log.debug("KnownSpelLevelController cast", key);
    spellbookService.spontaneousCast(key, name);
  }

  ctrl.restoreSlot = function(key) {
    spellbookService.spontaneousRestore(key);
  }

  ctrl.delete = function(key, id) {
    $log.debug("SpellbookBookController ctrl.delete", key, id);
    spellbookService.selectedCharacter.knownSpells[key].spells.splice(id, 1);
    spellbookService.saveCharacters();
  }

  ctrl.edit = function() {
    ctrl.perDay = ctrl.spellLevel.perDay;
    ctrl.known = ctrl.spellLevel.known;
    ctrl.editMode = true;
    focusService.setFocus('known');
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

  ctrl.chooseSpell = function(spell) {
    spellService.showSpell(spell.name);
  }

}

const KnownSpelLevelComponent = {
  template: require('./known-spell-level.html'),
  controller: [
    '$log',
    '$state',
    'filterService',
    'focusService',
    'spellService',
    'spellbookService',
    'CLASSES',
    KnownSpelLevelController
  ],
  bindings: {
    spellLevel: '<',
    level: '<',
    index: '<'
  }
}

export default KnownSpelLevelComponent;
