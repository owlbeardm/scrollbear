"use strict";

function MainController(spellService, $window, $state, $log, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;
  const localStorage = $window['localStorage'];
  const FAV_ONLY = "FAV_ONLY";
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $state.go('main');
    });
    ctrl.classes = CLASSES;
    const favOnly = JSON.parse(localStorage.getItem(FAV_ONLY));
    const selectedClass = JSON.parse(localStorage.getItem(SELECTED_CLASS));
    ctrl.classSelected = (selectedClass && CLASSES[selectedClass]) ?
      selectedClass :
      'wizard';
    ctrl.favOnly = favOnly ?
      favOnly :
      false;
    ctrl.setClass();
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

  ctrl.setClass = function() {
    spellService.setClass(ctrl.classSelected);
    localStorage.setItem(SELECTED_CLASS, JSON.stringify(ctrl.classSelected));
    ctrl.search();
  }

  ctrl.setFavOnly = function() {
    localStorage.setItem(FAV_ONLY, JSON.stringify(ctrl.favOnly));
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
        const place = value.levels.split(', ').reduce((classAccumulator, classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          const isIncludeClass = CLASSES[ctrl.classSelected].search.reduce((accumulator, currentValue) => {
            return accumulator || className.startsWith(currentValue);
          }, false);
          if (isIncludeClass) {
            const newLevel = classLevel.substring(classLevel.length - 1)
            if (!classAccumulator || newLevel < classAccumulator) {
              return newLevel;
            }
          }
          return classAccumulator;
        }, undefined);
        if (place) {
          if (!allSells[place]) {
            allSells[place] = [];
          }
          allSells[place].push(value);
        }
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
  controller: [
    'spellService',
    '$window',
    '$state',
    '$log',
    'CLASSES',
    MainController
  ]
}

export default MainComponent;
