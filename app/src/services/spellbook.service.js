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
    // migrating from 1.9.3
    SpellbookService.characters.forEach((character)=>{
      if(!character.prepared){
        if(character.knownSpells){
          Object.entries(character.knownSpells).forEach((level)=>{
            level[1].spells = level[1].spells.map((currentValue, index, array) =>{
              if(currentValue && typeof currentValue !== 'object'){
                return {name:currentValue};
              }
              return currentValue;
            });
          });
        }
      }
    });

    SpellbookService.selectedCharacter = JSON.parse(localStorage.getItem(SELECTED_CHARACTER))
      ? JSON.parse(localStorage.getItem(SELECTED_CHARACTER))
      : undefined;

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
    }

    SpellbookService.isNameExists = function(name) {
      return !!SpellbookService.characters.find(function(character) {
        return name.toUpperCase() == character.name.toUpperCase();
      });
    }

    SpellbookService.saveCharacters = function() {
      localStorage.setItem(CHARACTERS, JSON.stringify(SpellbookService.characters));
    }

    return SpellbookService;
  }
]);
