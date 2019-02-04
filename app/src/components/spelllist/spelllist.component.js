"use strict";

function SpellListController($log, $state, filterService, spellService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellListController init");
    ctrl.classesC = CLASSES;
  }

  ctrl.chooseSpell = function(spell) {
    ctrl.spell = spell;
    const spell_url = spellService.spellNameToUrl(ctrl.spell.name);
    $state.go('spells', {
      spellUrl: spell_url
    });
  }

  ctrl.isFav = function(spell) {
    return filterService.isFav(spell);
  }

  ctrl.changeFav = function(spell) {
    filterService.changeFav(spell);
  }

}

const SpellListComponent = {
  template: require('./spelllist.html'),
  controller: ['$log', '$state', 'filterService', 'spellService', 'CLASSES', SpellListController],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default SpellListComponent;