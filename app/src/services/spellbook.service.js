angular.module('app.services').factory('spellbookService', [
  '$log',
  'characterService',
  ($log, characterService) => {
    const SpellbookService = {};
    $log.debug('SpellbookService started');

    SpellbookService.spontaneousCast = (key, name) => {
      if (!(characterService.getSelectedCharacter().knownSpells[key].cast
        < characterService.getSelectedCharacter().knownSpells[key].perDay)) {
        return;
      }
      characterService.getSelectedCharacter().knownSpells[key].cast = Math.min(
        characterService.getSelectedCharacter().knownSpells[key].perDay,
        characterService.getSelectedCharacter().knownSpells[key].cast + 1,
      );
      characterService.getSelectedCharacter().history.push({
        spontaneous: true,
        level: key,
        name,
      });
      characterService.persist();
      ga('send', 'event', 'cast', name, characterService.getSelectedCharacter().class);
    };

    SpellbookService.spontaneousRestore = (key) => {
      if (!(characterService.getSelectedCharacter().knownSpells[key].cast > 0)) {
        return;
      }
      characterService.getSelectedCharacter().knownSpells[key].cast = Math.max(
        0,
        characterService.getSelectedCharacter().knownSpells[key].cast - 1,
      );
      characterService.getSelectedCharacter().history.push({
        reset: true,
        spontaneous: true,
        level: key,
      });
      characterService.persist();
    };

    SpellbookService.preparedCast = (key, id) => {
      if (characterService.getSelectedCharacter().preparedSpells[key].spells[id].cast) {
        return;
      }
      characterService.getSelectedCharacter().preparedSpells[key].spells[id].cast = true;
      characterService.getSelectedCharacter().history.push({
        prepared: true,
        level: key,
        name: characterService.getSelectedCharacter().preparedSpells[key].spells[id].name,
      });
      characterService.persist();
      ga('send', 'event', 'cast', characterService.getSelectedCharacter().preparedSpells[key].spells[id].name,
        characterService.getSelectedCharacter().class);
    };

    SpellbookService.preparedRestore = (key, id) => {
      if (!(characterService.getSelectedCharacter().preparedSpells[key].spells[id].cast)) {
        return;
      }
      delete characterService.getSelectedCharacter().preparedSpells[key].spells[id].cast;
      characterService.getSelectedCharacter().history.push({
        reset: true,
        prepared: true,
        level: key,
        name: characterService.getSelectedCharacter().preparedSpells[key].spells[id].name,
      });
      characterService.persist();
    };

    SpellbookService.resetCast = () => {
      if (characterService.getSelectedCharacter().knownSpells) {
        Object.entries(characterService.getSelectedCharacter().knownSpells).forEach((pair) => {
          pair[1].cast = 0;
        });
      }
      if (characterService.getSelectedCharacter().preparedSpells) {
        Object.entries(characterService.getSelectedCharacter().preparedSpells).forEach((pair) => {
          pair[1].spells.forEach((spell) => {
            delete spell.cast;
          });
        });
      }
      characterService.getSelectedCharacter().history = [];
      characterService.persist();
    };

    return SpellbookService;
  },
]);
