angular.module('app.services').factory('spellbookService', [
  '$log',
  '$window',
  ($log, $window) => {
    const SpellbookService = {};
    const CHARACTERS = 'CHARACTERS';
    const SELECTED_CHARACTER = 'SELECTED_CHARACTER';
    const {
      localStorage,
    } = $window;
    SpellbookService.characters = [];

    SpellbookService.characters = JSON.parse(localStorage.getItem(CHARACTERS))
      ? JSON.parse(localStorage.getItem(CHARACTERS)) : [];
    // migrating from 1.9.3
    SpellbookService.characters.forEach((character) => {
      if (!character.prepared) {
        if (character.knownSpells) {
          Object.entries(character.knownSpells).forEach((level) => {
            level[1].spells = level[1].spells.map((currentValue) => {
              if (currentValue && typeof currentValue !== 'object') {
                return {
                  name: currentValue,
                };
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
    if (SpellbookService.selectedCharacter && !SpellbookService.selectedCharacter.history) {
      SpellbookService.selectedCharacter.history = [];
    }

    SpellbookService.addCharacter = (character) => {
      SpellbookService.characters.push(character);
      SpellbookService.saveCharacters();
      ga('send', 'event', 'characters', 'new', character.class);
    };

    SpellbookService.deleteCharacter = (id) => {
      SpellbookService.characters.splice(id, 1);
      SpellbookService.saveCharacters();
    };

    SpellbookService.selectCharacter = (character) => {
      SpellbookService.selectedCharacter = character;
      if (SpellbookService.selectedCharacter && !SpellbookService.selectedCharacter.history) {
        SpellbookService.selectedCharacter.history = [];
      }
      ga('send', 'event', 'characters', 'select', character.class);
    };

    SpellbookService.isNameExists = (name) => !!SpellbookService.characters.find(
      (character) => name.toUpperCase() === character.name.toUpperCase(),
    );

    SpellbookService.saveCharacters = () => {
      localStorage.setItem(CHARACTERS, JSON.stringify(SpellbookService.characters));
    };

    SpellbookService.spontaneousCast = (key, name) => {
      if (!(SpellbookService.selectedCharacter.knownSpells[key].cast
          < SpellbookService.selectedCharacter.knownSpells[key].perDay)) {
        return;
      }
      SpellbookService.selectedCharacter.knownSpells[key].cast = Math.min(
        SpellbookService.selectedCharacter.knownSpells[key].perDay,
        SpellbookService.selectedCharacter.knownSpells[key].cast + 1,
      );
      SpellbookService.selectedCharacter.history.push({
        spontaneous: true,
        level: key,
        name,
      });
      SpellbookService.saveCharacters();
      ga('send', 'event', 'cast', name, SpellbookService.selectedCharacter.class);
    };

    SpellbookService.spontaneousRestore = (key) => {
      if (!(SpellbookService.selectedCharacter.knownSpells[key].cast > 0)) {
        return;
      }
      SpellbookService.selectedCharacter.knownSpells[key].cast = Math.max(
        0,
        SpellbookService.selectedCharacter.knownSpells[key].cast - 1,
      );
      SpellbookService.selectedCharacter.history.push({
        reset: true,
        spontaneous: true,
        level: key,
      });
      SpellbookService.saveCharacters();
    };

    SpellbookService.preparedCast = (key, id) => {
      if (SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast) {
        return;
      }
      SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast = true;
      SpellbookService.selectedCharacter.history.push({
        prepared: true,
        level: key,
        name: SpellbookService.selectedCharacter.preparedSpells[key].spells[id].name,
      });
      SpellbookService.saveCharacters();
      ga('send', 'event', 'cast', SpellbookService.selectedCharacter.preparedSpells[key].spells[id].name,
        SpellbookService.selectedCharacter.class);
    };

    SpellbookService.preparedRestore = (key, id) => {
      if (!(SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast)) {
        return;
      }
      delete SpellbookService.selectedCharacter.preparedSpells[key].spells[id].cast;
      SpellbookService.selectedCharacter.history.push({
        reset: true,
        prepared: true,
        level: key,
        name: SpellbookService.selectedCharacter.preparedSpells[key].spells[id].name,
      });
      SpellbookService.saveCharacters();
    };

    SpellbookService.resetCast = () => {
      if (SpellbookService.selectedCharacter.knownSpells) {
        Object.entries(SpellbookService.selectedCharacter.knownSpells).forEach((pair) => {
          pair[1].cast = 0;
        });
      }
      if (SpellbookService.selectedCharacter.preparedSpells) {
        Object.entries(SpellbookService.selectedCharacter.preparedSpells).forEach((pair) => {
          pair[1].spells.forEach((spell) => {
            delete spell.cast;
          });
        });
      }
      SpellbookService.selectedCharacter.history = [];
      SpellbookService.saveCharacters();
    };

    return SpellbookService;
  },
]);
