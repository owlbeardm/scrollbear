"use strict";

const allSpells = require('../../../resources/spells.json');

angular.module('app.services').factory('spellService', [
  '$log',
  function($log) {
    const SpellService = {};

    SpellService.getAllSpells = function() {
      return allSpells;
    };

    SpellService.getSpellByUrl = function(url) {
      return allSpells.find((spell) => {
        return spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_') == url;
      });
    };

    return SpellService;
  }
]);
