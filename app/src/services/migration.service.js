angular.module('app.services').factory('migrationService', [
  '$log',
  ($log) => {
    const MigrationService = {};

    MigrationService.migrateCharacters = (characters) => {
      $log.debug('Migration from characters');

      characters.forEach((character) => {
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

      characters.forEach((character) => {
        if (!character.history) {
          character.history = [];
        }
        if (character.preparedSpells) {
          Object.entries(character.preparedSpells).forEach(([key]) => {
            if (!Number.isInteger(Number.parseInt(key, 10))) {
              delete character.preparedSpells[key];
            }
          });
        }
        if (character.knownSpells) {
          Object.entries(character.knownSpells).forEach(([key]) => {
            if (!Number.isInteger(Number.parseInt(key, 10))) {
              delete character.preparedSpells[key];
            }
          });
        }
        $log.debug('Characters', character);
      });
    };

    return MigrationService;
  },
]);
