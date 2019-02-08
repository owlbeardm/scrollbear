"use strict";

angular.module('app.services').factory('spellbookService', [
  '$log',
  '$window',
  function($log, $window) {
    const SpellbookService = {};
    const CHARACTERS = "CHARACTERS";
    const SELECTED_CHARACTER = "SELECTED_CHARACTER";
    const localStorage = $window['localStorage'];
    SpellbookService.characters = [];

    SpellbookService.characters = JSON.parse(localStorage.getItem(CHARACTERS))
      ? JSON.parse(localStorage.getItem(CHARACTERS))
      : [];

    SpellbookService.selectedCharacter = JSON.parse(localStorage.getItem(SELECTED_CHARACTER))
      ? JSON.parse(localStorage.getItem(SELECTED_CHARACTER))
      : undefined;

    SpellbookService.addCharacter = function(character) {
      SpellbookService.characters.push(character);
      saveCharacters();
    }

    SpellbookService.deleteCharacter = function(id) {
      SpellbookService.characters.splice(id, 1);
      saveCharacters();
    }

    SpellbookService.selectCharacter = function(character) {
      SpellbookService.selectedCharacter = character;
    }

    function saveCharacters() {
      localStorage.setItem(CHARACTERS, JSON.stringify(SpellbookService.characters));
    }

    return SpellbookService;
  }
]);
