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
      if (!(SpellbookService.selectedCharacter.knownSpells[key].cast < SpellbookService.selectedCharacter.knownSpells[key].perDay)) {
        return;
      }
      SpellbookService.selectedCharacter.knownSpells[key].cast = Math.min(SpellbookService.selectedCharacter.knownSpells[key].perDay, SpellbookService.selectedCharacter.knownSpells[key].cast + 1);
      SpellbookService.selectedCharacter.history.push({
        spontaneous: true,
        level: key,
        name: name
      });
      SpellbookService.saveCharacters();
    }

    SpellbookService.spontaneousRestore = function(key) {
      if (!(SpellbookService.selectedCharacter.knownSpells[key].cast > 0)) {
        return;
      }
      SpellbookService.selectedCharacter.knownSpells[key].cast = Math.max(0, SpellbookService.selectedCharacter.knownSpells[key].cast - 1);
      SpellbookService.selectedCharacter.history.push({
        reset: true,
        spontaneous: true,
        level: key
      });
      SpellbookService.saveCharacters();
    }

    SpellbookService.preparedCast = function(key, id) {
      if (SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast) {
        return;
      }
      SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast = true;
      SpellbookService.selectedCharacter.history.push({
        prepared: true,
        level: key,
        name: SpellbookService.selectedCharacter.preparedSpells[key].spells[id].name
      });
      SpellbookService.saveCharacters();
    }

    SpellbookService.preparedRestore = function(key, id) {
      if (!(SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast)) {
        return;
      }
      delete SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast;
      SpellbookService.selectedCharacter.history.push({
        reset: true,
        prepared: true,
        level: key,
        name: SpellbookService.selectedCharacter.preparedSpells[key].spells[id].name
      });
      SpellbookService.saveCharacters();
    }

    SpellbookService.resetCast = function() {
      if (SpellbookService.selectedCharacter.knownSpells)
        Object.entries(SpellbookService.selectedCharacter.knownSpells).forEach(function(pair) {
          pair[1].cast = 0
        });
      if (SpellbookService.selectedCharacter.preparedSpells)
        Object.entries(SpellbookService.selectedCharacter.preparedSpells).forEach(function(pair) {
          pair[1].spells.forEach(function(spell) {
            delete spell.cast;
          });
        });
      SpellbookService.selectedCharacter.history = [];
      SpellbookService.saveCharacters();
    }

    return SpellbookService;
  }
]);
