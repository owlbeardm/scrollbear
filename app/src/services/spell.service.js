"use strict";

const allSpells = require('../../../resources/spells.json');

angular.module('app.services').factory('spellService', [
  '$log',
  '$window',
  'filterService',
  'CLASSES',
  function($log, $window, filterService, CLASSES) {
    const SpellService = {};
    const localStorage = $window['localStorage'];
    SpellService.currentSpells = [];
    SpellService.classSet = [];

    SpellService.getAllSpells = function() {
      return SpellService.currentSpells;
    };

    SpellService.getSpellsSplited = function() {
      const spellsTmp = SpellService.currentSpells.filter(filterService.filter);
      const allSells = {};
      spellsTmp.forEach((value) => {
        const place = value.levels.split(', ').reduce((classAccumulator, classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          const isIncludeClass = (!CLASSES[SpellService.classSet].search) ? true : CLASSES[SpellService.classSet].search.reduce((accumulator, currentValue) => {
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
      });
      return allSells;
    };

    SpellService.setClass = function(classSet) {
      SpellService.classSet = classSet;
      SpellService.currentSpells = allSpells.filter((value) => {
        return value.levels.split(', ').reduce((accumulatorSpell, classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          const isIncludeClass = (!CLASSES[classSet].search) ? true : CLASSES[classSet].search.reduce((accumulator, currentValue) => {
            return accumulator || className.startsWith(currentValue);
          }, false);
          return accumulatorSpell || isIncludeClass;
        }, false);
      });
    };

    SpellService.getSpellByUrl = function(url) {
      return allSpells.find((spell) => {
        return SpellService.spellNameToUrl(spell.name) == url;
      });
    };

    SpellService.spellNameToUrl = function(name) {
      return name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
    }

    SpellService.getSpellsCountByFilter = function() {
      return allSpells.filter(filterService.filter).length;
    }

    return SpellService;
  }
]);
