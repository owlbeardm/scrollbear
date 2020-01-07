angular.module('app.services').factory('spellbookService', [
  '$log',
  ($log) => {
    const SpellbookService = {};
    $log.debug('SpellbookService started');

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
