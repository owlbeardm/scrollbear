const showdown = require('showdown');
const allSpells = require('../../../resources/spells.json');

angular.module('app.services').factory('spellService', [
  '$log',
  '$window',
  '$rootScope',
  'filterService',
  'CLASSES',
  ($log, $window, $rootScope, filterService, CLASSES) => {
    const SpellService = {};
    SpellService.currentSpells = [];
    SpellService.classSet = [];

    SpellService.getAllSpells = () => SpellService.currentSpells;

    SpellService.getSpellsSplited = () => {
      console.time('SpellService.getSpellsSplited');
      const spellsTmp = SpellService.currentSpells.filter(filterService.filter);
      if (spellsTmp.length < 10) {
        $log.debug(spellsTmp);
      }
      const allSells = {};
      spellsTmp.forEach((value) => {
        const place = value.levels.reduce((classAccumulator, classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          const isIncludeClass = (!CLASSES[SpellService.classSet].search)
            ? true
            : CLASSES[SpellService.classSet].search.reduce(
              (accumulator, currentValue) => accumulator || className.search(currentValue) !== -1,
              false,
            );
          if (isIncludeClass) {
            const newLevel = classLevel.substring(classLevel.length - 1);
            if (!classAccumulator || newLevel < classAccumulator) {
              return newLevel;
            }
          }
          return classAccumulator;
        }, undefined);
        if (place) {
          if (!allSells[place]) {
            allSells[place] = [];
          }
          allSells[place].push(value);
        }
      });
      console.timeEnd('SpellService.getSpellsSplited');
      return allSells;
    };

    SpellService.setClass = (classSet) => {
      console.time('SpellService.setClass');
      SpellService.classSet = classSet;
      SpellService.currentSpells = allSpells.filter((value) => {
        if (!value.levels) {
          return false;
        }
        return value.levels.reduce((accumulatorSpell, classLevel) => {
          const className = classLevel.substring(0, classLevel.length - 2);
          const isIncludeClass = (!CLASSES[classSet].search)
            ? true
            : CLASSES[classSet].search.reduce(
              (accumulator, currentValue) => accumulator || className.search(currentValue) !== -1,
              false,
            );
          return accumulatorSpell || isIncludeClass;
        }, false);
      });
      console.timeEnd('SpellService.setClass');
    };

    SpellService.getSpellByUrl = (url) => allSpells.find((spell) => SpellService.spellNameToUrl(spell.name) === url);

    SpellService.spellNameToUrl = (name) => name.toLowerCase().trim()
      .replace(/[.*+?^$ ,{}()|[\]\\/]/g, '-')
      .replace(/[’]/g, '_');

    SpellService.getSpellsCountByFilter = () => allSpells.filter(filterService.filter).length;

    SpellService.showSpell = (spellName) => {
      const spell = allSpells.find((spellFound) => spellFound.name === spellName);
      $rootScope.spell = spell;
      $rootScope.description = spell.description;
      $rootScope.spellDescription = SpellService.getSpellDescription(spell.description);
      $rootScope.spellSource = SpellService.getSpellSource(spell.source);
      const popup = angular.element('#modalSpell');
      popup.modal('show');
    };

    SpellService.getSpellDescription = (md) => {
      const converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
      });
      let html = `<div>${converter.makeHtml(md)}</div>`;
      html = html.replace(/<table>/g, "<div class='table-responsive'><table class='table table-sm'>")
        .replace(/<\/table>/g, '</table></div>')
        .replace(/<thead>/g, "<thead class='text-primary'>");
      return html;
    };

    SpellService.getSpellSource = (md) => {
      const converter = new showdown.Converter({
        tables: true,
        strikethrough: true,
      });
      const html = `<div>${converter.makeHtml(md)}</div>`;
      return html;
    };

    SpellService.getPlainSpellSource = (md) => {
      const close = md.indexOf(' pg. ');
      if (close === -1) {
        return md;
      }
      return md.substring(2, close);
    };

    return SpellService;
  },
]);
