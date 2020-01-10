angular.module('app.services').factory('spellbookService', [
  '$log',
  '$rootScope',
  'characterService',
  'CLASSES',
  ($log, $rootScope, characterService, CLASSES) => {
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

    SpellbookService.addSpell = (spell, spellToAdd, classSelected, lvl) => {
      $log.debug('addSpell 1', spellToAdd, spell);
      let level = lvl;
      if (classSelected) {
        const classLevel = spell.levels.reduce((accumulator, currentValue) => {
          if (CLASSES[classSelected].search && CLASSES[classSelected].search.length) {
            if (CLASSES[classSelected].search.reduce((acc, curr) => acc || currentValue.search(curr) !== -1, false)) {
              const curLevel = currentValue.substring(currentValue.length - 1);
              if (!accumulator || accumulator > curLevel) {
                return curLevel;
              }
            }
          }
          return accumulator;
        }, undefined);
        if (classLevel) {
          level = classLevel;
        }
      }
      if (!characterService.getSelectedCharacter().prepared) {
        if (!characterService.getSelectedCharacter().knownSpells) {
          characterService.getSelectedCharacter().knownSpells = {};
        }
        if (!characterService.getSelectedCharacter().knownSpells[level]) {
          characterService.getSelectedCharacter().knownSpells[level] = {
            spells: [],
          };
        }
        characterService.getSelectedCharacter().knownSpells[level].spells.push(spellToAdd);
      } else {
        if (!characterService.getSelectedCharacter().preparedSpells) {
          characterService.getSelectedCharacter().preparedSpells = {};
        }
        if (!characterService.getSelectedCharacter().preparedSpells[level]) {
          characterService.getSelectedCharacter().preparedSpells[level] = {
            spells: [],
          };
        }
        characterService.getSelectedCharacter().preparedSpells[level].spells.push(spellToAdd);
      }
      characterService.persist();
      $log.debug(characterService.getSelectedCharacter());
      if (!characterService.getSelectedCharacter().prepared) {
        ga('send', 'event', 'known_add', spellToAdd.name, characterService.getSelectedCharacter().class);
      } else {
        ga('send', 'event', 'prepared_add', spellToAdd.name, characterService.getSelectedCharacter().class);
      }
    };

    SpellbookService.addMetamagic = (spell, classSelected, lvl) => {
      let level = lvl;
      if (classSelected) {
        const classLevel = spell.levels.reduce((accumulator, currentValue) => {
          if (CLASSES[classSelected].search && CLASSES[classSelected].search.length) {
            if (CLASSES[classSelected].search.reduce((acc, curr) => acc || currentValue.search(curr) !== -1, false)) {
              const curLevel = currentValue.substring(currentValue.length - 1);
              if (!accumulator || accumulator > curLevel) {
                return curLevel;
              }
            }
          }
          return accumulator;
        }, undefined);
        if (classLevel) {
          level = classLevel;
        }
      }
      $rootScope.spell = spell;
      $rootScope.spellLevel = level;

      const popup = angular.element('#modalMetamagic');
      $log.debug('AppController metamagic', popup);
      popup.modal('show');
    };

    return SpellbookService;
  },
]);
