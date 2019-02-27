"use strict";

function KnownSpelLevelController($log, $state, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("KnownSpelLevelController init");
  }

  ctrl.cast = function(key) {
    spellbookService.selectedCharacter.knownSpells[key].cast++;
    spellbookService.saveCharacters();
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
    const spell_url = spellService.spellNameToUrl(spell);
    $state.go('spells', {
      spellUrl: spell_url
    });
  }

}

const KnownSpelLevelComponent = {
  template: require('./known-spell-level.html'),
  controller: [
    '$log',
    '$state',
    'filterService',
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
