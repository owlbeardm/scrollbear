"use strict";

angular.module('app.services').factory('filterService', [
  '$log',
  '$window',
  'CLASSES',
  'SCHOOLS',
  'SUBSCHOOLS',
  'CASTING_TIME',
  function($log, $window, CLASSES, SCHOOLS, SUBSCHOOLS, CASTING_TIME) {
    const FilterService = {};
    const FAV_SPELLS = "FAV_SPELLS";
    const FAV_ONLY = "FAV_ONLY";
    const SOURCE_BOOKS = "SOURCE_BOOKS";
    const localStorage = $window['localStorage'];
    FilterService.school = 'any';
    FilterService.subSchool = 'any';
    FilterService.castingTime = 'any';
    FilterService.favOnly = JSON.parse(localStorage.getItem(FAV_ONLY)) ?
      JSON.parse(localStorage.getItem(FAV_ONLY)) :
      false;
    FilterService.sourceBooks = JSON.parse(localStorage.getItem(SOURCE_BOOKS)) ?
      JSON.parse(localStorage.getItem(SOURCE_BOOKS)) : [];


    FilterService.setFavOnly = function(favOnly) {
      FilterService.favOnly = favOnly;
      localStorage.setItem(FAV_ONLY, JSON.stringify(FilterService.favOnly));
    }

    FilterService.setSourceBook = function(sourceBooks) {
      FilterService.sourceBooks = sourceBooks;
      localStorage.setItem(SOURCE_BOOKS, JSON.stringify(FilterService.sourceBooks));
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
      if (include && FilterService.sourceBooks.length) {
        include = include && FilterService.sourceBooks.includes(spell.source.substring(2, spell.source.indexOf(' pg.')));
      }
      if (include) {
        if (Array.isArray(SCHOOLS[FilterService.school].search)) {
          include = include && SCHOOLS[FilterService.school].search.includes(spell.school);
        } else {
          include = include && SCHOOLS[FilterService.school].search(spell);
        }
      }
      if (include) {
        if (Array.isArray(SUBSCHOOLS[FilterService.subSchool].search)) {
          include = include && SUBSCHOOLS[FilterService.subSchool].search.includes(spell.subschool);
        } else {
          include = include && SUBSCHOOLS[FilterService.subSchool].search(spell);
        }
      }
      if (include) {
        if (Array.isArray(CASTING_TIME[FilterService.castingTime].search)) {
          include = include && CASTING_TIME[FilterService.castingTime].search.includes(spell.castingTime);
        } else {
          include = include && CASTING_TIME[FilterService.castingTime].search(spell);
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
