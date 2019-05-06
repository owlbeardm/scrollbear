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

    SpellbookService.characters = JSON.parse(localStorage.getItem(CHARACTERS)) ?
      JSON.parse(localStorage.getItem(CHARACTERS)) : [];
    // migrating from 1.9.3
    SpellbookService.characters.forEach((character) => {
      if (!character.prepared) {
        if (character.knownSpells) {
          Object.entries(character.knownSpells).forEach((level) => {
            level[1].spells = level[1].spells.map((currentValue, index, array) => {
              if (currentValue && typeof currentValue !== 'object') {
                return {
                  name: currentValue
                };
              }
              return currentValue;
            });
          });
        }
      }
    });

    SpellbookService.selectedCharacter = JSON.parse(localStorage.getItem(SELECTED_CHARACTER)) ?
      JSON.parse(localStorage.getItem(SELECTED_CHARACTER)) :
      undefined;
    if (SpellbookService.selectedCharacter && !SpellbookService.selectedCharacter.history) {
      SpellbookService.selectedCharacter.history = [];
    }

    SpellbookService.addCharacter = function(character) {
      SpellbookService.characters.push(character);
      SpellbookService.saveCharacters();
    }

    SpellbookService.deleteCharacter = function(id) {
      SpellbookService.characters.splice(id, 1);
      SpellbookService.saveCharacters();
    }

    SpellbookService.selectCharacter = function(character) {
      SpellbookService.selectedCharacter = character;
      if (SpellbookService.selectedCharacter && !SpellbookService.selectedCharacter.history) {
        SpellbookService.selectedCharacter.history = [];
      }
    }

    SpellbookService.isNameExists = function(name) {
      return !!SpellbookService.characters.find(function(character) {
        return name.toUpperCase() == character.name.toUpperCase();
      });
    }

    SpellbookService.saveCharacters = function() {
      localStorage.setItem(CHARACTERS, JSON.stringify(SpellbookService.characters));
    }

    SpellbookService.spontaneousCast = function(key, name) {
      SpellbookService.selectedCharacter.knownSpells[key].cast = Math.min(SpellbookService.selectedCharacter.knownSpells[key].perDay, SpellbookService.selectedCharacter.knownSpells[key].cast + 1);
      SpellbookService.selectedCharacter.history.push({
        spontaneous: true,
        level: key,
        name: name
      });
      SpellbookService.saveCharacters();
    }

    SpellbookService.spontaneousRestore = function(key) {
      SpellbookService.selectedCharacter.knownSpells[key].cast = Math.max(0, SpellbookService.selectedCharacter.knownSpells[key].cast - 1);
      SpellbookService.selectedCharacter.history.push({
        reset: true,
        spontaneous: true,
        level: key
      });
      SpellbookService.saveCharacters();
    }

    SpellbookService.resetCast = function() {
      Object.entries(SpellbookService.selectedCharacter.knownSpells).forEach(function(pair) {
        pair[1].cast = 0
      });
      SpellbookService.selectedCharacter.history = [];
      SpellbookService.saveCharacters();
    }

    return SpellbookService;
  }
]);
