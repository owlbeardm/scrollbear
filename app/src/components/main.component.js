"use strict";

function MainController(spellService, $state, $log) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    ctrl.spells = getSpells();
    $log.debug("AppController init", ctrl.spells);
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $state.go('main');
    });
  }

  ctrl.chooseSpell = function(index) {
    ctrl.spell = ctrl.spells[index];
    const spell_url = ctrl.spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
    $state.go('spells', {
      spellUrl: spell_url
    });
  }

  ctrl.isFav = function(index) {
    return spellService.isFav(ctrl.spells[index]);
  }

  ctrl.changeFav = function(index) {
    spellService.changeFav(ctrl.spells[index]);
  }

  ctrl.search = function() {
    $log.debug("AppController ctrl.search", ctrl.filter);
    ctrl.spells = getSpells();
  }

  function getSpells() {
    return spellService.getAllSpells().filter((value) => {
      let include = false;
      if (!ctrl.filter) {
        include = true;
      } else {
        include = value.name.toLowerCase().includes(ctrl.filter.toLowerCase())
      }
      if (ctrl.favOnly) {
        include = include && spellService.isFav(value);
      }
      return include;
    });
  }
}

const MainComponent = {
  template: require('./main.html'),
  controller: ['spellService', '$state', '$log', MainController]
}

export default MainComponent;
