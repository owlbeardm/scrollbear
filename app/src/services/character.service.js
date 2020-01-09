angular.module('app.services').factory('characterService', [
  '$log',
  '$window',
  'migrationService',
  ($log, $window, migrationService) => {
    const CharacterService = {};
    const Internal = {};
    //
    // On Init
    //
    const CHARACTERS = 'CHARACTERS';
    const SELECTED_CHARACTER = 'SELECTED_CHARACTER';
    const {
      localStorage,
    } = $window;

    Internal.characters = JSON.parse(localStorage.getItem(CHARACTERS))
      ? JSON.parse(localStorage.getItem(CHARACTERS)) : [];

    Internal.selectedCharacter = JSON.parse(localStorage.getItem(SELECTED_CHARACTER))
      ? JSON.parse(localStorage.getItem(SELECTED_CHARACTER)) : undefined;
    //
    // On Init Finish
    //
    migrationService.migrateCharacters(Internal.characters);

    // Internal functions
    Internal.saveCharactersToStore = () => {
      localStorage.setItem(CHARACTERS, JSON.stringify(Internal.characters));
    };

    CharacterService.getCharacters = () => Internal.characters;

    CharacterService.getSelectedCharacter = () => Internal.selectedCharacter;

    CharacterService.addCharacter = (character) => {
      if (CharacterService.isCharacterNameExists(character.name)) return;
      Internal.characters.push(character);
      Internal.saveCharactersToStore();
      ga('send', 'event', 'characters', 'new', character.class);
    };

    CharacterService.deleteCharacter = (id) => {
      Internal.characters.splice(id, 1);
      Internal.saveCharactersToStore();
      ga('send', 'event', 'characters', 'deletes', Internal.characters[id].class);
    };

    CharacterService.selectCharacter = (character) => {
      Internal.selectedCharacter = character;
      if (Internal.selectedCharacter && Internal.selectedCharacter.history) {
        Internal.selectedCharacter.history = [];
      }
      ga('send', 'event', 'characters', 'select', character.class);
    };

    CharacterService.isCharacterNameExists = (name) => !!Internal.characters
      .find((character) => name.toUpperCase() === character.name.toUpperCase());

    CharacterService.getSelectedCharacter = () => Internal.selectedCharacter;

    CharacterService.persist = () => {
      Internal.saveCharactersToStore();
    };


    return CharacterService;
  },
]);
