"use strict";

function PreparedSpelLevelController($log, $state, filterService, focusService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("PreparedSpelLevelController init", spellbookService.selectedCharacter.preparedSpells);
    spellbookService.selectedCharacter.preparedSpells[ctrl.level].spells.sort((a, b) => {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    spellbookService.saveCharacters();
  }

  ctrl.cast = function(key, id) {
    spellbookService.preparedCast(key, id);
  }

  ctrl.restore = function(key, id) {
    spellbookService.preparedRestore(key, id);
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
      curr.cast ?
      1 :
      0), 0);
  }

  ctrl.chooseSpell = function(spell) {
    spellService.showSpell(spell);
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
