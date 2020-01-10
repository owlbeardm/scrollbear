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
      });
    };

    return MigrationService;
  },
]);
