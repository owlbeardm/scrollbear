"use strict";

function MainController(spellService, $state, $log, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    ctrl.total = 0;
    ctrl.spells = getSpells();
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $state.go('main');
    });
    ctrl.classes = CLASSES;
    ctrl.classSelected = 'wizard'
    ctrl.setClass();
  }

  ctrl.chooseSpell = function(index) {
    ctrl.spell = ctrl.spells[index];
    const spell_url = ctrl.spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
    $state.go('spells', {spellUrl: spell_url});
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

  ctrl.setClass = function() {
    spellService.setClass(ctrl.classSelected);
    ctrl.search();
  }

  function getSpells() {
    const allSells = {};
    spellService.getAllSpells().forEach((value) => {
      let include = false;
      if (!ctrl.filter) {
        include = true;
      } else {
        include = value.name.toLowerCase().includes(ctrl.filter.toLowerCase())
      }
      if (ctrl.favOnly) {
        include = include && spellService.isFav(value);
      }
      if (include) {
        value.levels.split(', ').forEach((classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          if (className.includes(ctrl.classSelected)) {
            if (!allSells[classLevel.substring(classLevel.length - 1)]) {
              allSells[classLevel.substring(classLevel.length - 1)] = [];
            }
            allSells[classLevel.substring(classLevel.length - 1)].push(value);
          }
        });
      }
    });
    ctrl.total = Object.entries(allSells).reduce(function(total, pair) {
      return total + (pair[1].length);
    }, 0);
    return allSells;
  }
}

const MainComponent = {
  template: require('./main.html'),
  controller: ['spellService', '$state', '$log', 'CLASSES', MainController]
}

export default MainComponent;
