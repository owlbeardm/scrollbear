"use strict";

function PreparedController($log, $state, filterService, spellService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("PreparedController init");
    ctrl.spells = {
      level: {},
      day: {}
    }

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

const PreparedComponent = {
  template: require('./prepared.html'),
  controller: ['$log', '$state', 'filterService', 'spellService', 'CLASSES', PreparedController],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default PreparedComponent;
