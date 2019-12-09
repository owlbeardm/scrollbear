angular.module('app.services').factory('characterService', [
	'$log',
	'$window',
	function ($log, $window) {
		const CharacterService = {};
		const Internal = {};
		//
		// On Init
		//
		const CHARACTERS = "CHARACTERS";
		const SELECTED_CHARACTER = "SELECTED_CHARACTER";
		const localStorage = $window['localStorage'];

		Internal.characters = JSON.parse(localStorage.getItem(CHARACTERS)) ?
			JSON.parse(localStorage.getItem(CHARACTERS)) : [];

		Internal.selectedCharacter = JSON.parse(localStorage.getItem(SELECTED_CHARACTER)) ?
			JSON.parse(localStorage.getItem(SELECTED_CHARACTER)) : undefined;
		//
		// On Init Finish
		//

		// TODO: Add migration
		// 1. from version
		// 2. add history

		// Internal functions
		Internal.saveCharactersToStore = function () {
			localStorage.setItem(CHARACTERS, JSON.stringify(Internal.characters));
		}

		CharacterService.addCharacter = function (character) {
			if (CharacterService.isCharacterNameExists(character.name))
				return;
			Internal.characters.push(character);
			Internal.saveCharactersToStore();
			ga('send', 'event', 'characters', 'new', character.class);
		}

		CharacterService.deleteCharacter = function (id) {
			Internal.characters.splice(id, 1);
			Internal.saveCharactersToStore();
			ga('send', 'event', 'characters', 'deletes', characters[id].class);
		}

		CharacterService.selectCharacter = function (character) {
			Internal.selectedCharacter = character;
			if (Internal.selectedCharacter && Internal.selectedCharacter.history) {
				Internal.selectedCharacter.history = [];
			}
			ga('send', 'event', 'characters', 'select', character.class);
		}

		CharacterService.isCharacterNameExists = function (name) {
			return !!Internal.characters.find(function (character) {
				return name.toUpperCase() == character.name.toUpperCase();
			});
		}

		CharacterService.getSelectedCharacter = function () {
			return Internal.selectedCharacter;
		}

		CharacterService.persist = function () {
			Internal.saveCharactersToStore();
		}



		return CharacterService;
	}
]);
