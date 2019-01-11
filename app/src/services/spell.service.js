"use strict";

const allSpells = require('../../../resources/spells.json');

angular.module('app.services').factory('spellService', [
  '$log',
  '$window',
  'CLASSES',
  function($log, $window, CLASSES) {
    const SpellService = {};
    const localStorage = $window['localStorage'];
    const FAV_SPELLS = "FAV_SPELLS";
    let currentSpells = [];


    SpellService.getAllSpells = function() {
      return currentSpells;
    };

    SpellService.setClass = function(classSet) {
      currentSpells = allSpells.filter((value) => {
        return value.levels.split(', ').reduce((accumulatorSpell, classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          const isIncludeClass = CLASSES[classSet].search.reduce((accumulator, currentValue) => {
            return accumulator || className.startsWith(currentValue);
          }, false);
          return accumulatorSpell || isIncludeClass;
        }, false);
      });
    };

    SpellService.getSpellByUrl = function(url) {
      return allSpells.find((spell) => {
        return spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_') == url;
      });
    };

    SpellService.isFav = function(spell) {
      let favSpellsNames = JSON.parse(localStorage.getItem(FAV_SPELLS));
      if (!favSpellsNames || !favSpellsNames.length) {
        favSpellsNames = [];
      }
      return favSpellsNames.includes(spell.name);
    };

    SpellService.changeFav = function(spell) {
      let favSpellsNames = JSON.parse(localStorage.getItem(FAV_SPELLS));
      if (!favSpellsNames || !favSpellsNames.length) {
        favSpellsNames = [];
      }
      if (favSpellsNames.includes(spell.name)) {
        favSpellsNames.splice(favSpellsNames.indexOf(spell.name), 1);
      } else {
        favSpellsNames.push(spell.name);
      }
      localStorage.setItem(FAV_SPELLS, JSON.stringify(favSpellsNames));
    };

    return SpellService;
  }
]);
