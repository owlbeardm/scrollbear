"use strict";

function SpellListController($log, $rootScope, $state, spellService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;
  ctrl.rootScope = $rootScope;

  ctrl.$onInit = function() {
    $log.debug("SpellListController init");
    ctrl.classesC = CLASSES;
  }

  ctrl.chooseSpell = function(spell) {
    ctrl.spell = spell;
    const spell_url = ctrl.spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
    $state.go('spells', {
      spellUrl: spell_url
    });
  }

  ctrl.isFav = function(spell) {
    return spellService.isFav(spell);
  }

  ctrl.changeFav = function(spell) {
    spellService.changeFav(spell);
  }

}

const SpellListComponent = {
  template: require('./spelllist.html'),
  controller: ['$log', '$rootScope', '$state', 'spellService', 'CLASSES', SpellListController],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default SpellListComponent;
