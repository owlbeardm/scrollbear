"use strict";

angular.module('app.services').factory('filterService', [
  '$log',
  '$window',
  'CLASSES',
  'SCHOOLS',
  function($log, $window, CLASSES, SCHOOLS) {
    const FilterService = {};
    const FAV_SPELLS = "FAV_SPELLS";
    const FAV_ONLY = "FAV_ONLY";
    const localStorage = $window['localStorage'];
    FilterService.school = 'any';

    FilterService.favOnly = JSON.parse(localStorage.getItem(FAV_ONLY)) ?
      JSON.parse(localStorage.getItem(FAV_ONLY)) :
      false;

    FilterService.setFavOnly = function(favOnly) {
      FilterService.favOnly = favOnly;
      localStorage.setItem(FAV_ONLY, JSON.stringify(FilterService.favOnly));
    }

    FilterService.filter = function(spell) {
      let include = false;
      if (!FilterService.filterText) {
        include = true;
      } else {
        include = spell.name.toUpperCase().includes(FilterService.filterText.toUpperCase())
      }
      if (include && FilterService.favOnly) {
        include = include && FilterService.isFav(spell);
      }
      if (include) {
        if (Array.isArray(SCHOOLS[FilterService.school].search)) {
          include = include && SCHOOLS[FilterService.school].search.includes(spell.school);
        } else {
          include = include && SCHOOLS[FilterService.school].search(spell);
        }
      }
      return include;
    }

    FilterService.isFav = function(spell) {
      let favSpellsNames = JSON.parse(localStorage.getItem(FAV_SPELLS));
      if (!favSpellsNames || !favSpellsNames.length) {
        favSpellsNames = [];
      }
      return favSpellsNames.includes(spell.name);
    };

    FilterService.changeFav = function(spell) {
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

    return FilterService;
  }
]);
