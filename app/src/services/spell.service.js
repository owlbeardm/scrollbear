"use strict";

const allSpells = require('../../../resources/spells.json');

angular.module('app.services').factory('spellService', [
  '$log',
  '$window',
  function($log, $window) {
    const SpellService = {};
    const localStorage = $window['localStorage'];
    const FAV_SPELLS = "FAV_SPELLS";

    SpellService.getAllSpells = function() {
      return allSpells;
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
