const fs = require('fs');
const spells = require('./res/spells.json');
const manualSpells = require('./res/manual_spells.json');

async function format() {
  try {
    spells.forEach((spell) => {
      let desc = spell.description;
      const reg = /\[[^\]]+\]\(([^\)](?!all-spells))+\)/g;
      desc = desc.replace(reg, (match) => {
        const start = match.indexOf('[');
        const end = match.indexOf(']');
        return match.substring(start + 1, end);
      });
      const reg2 = /\[[^\]]+\]\([^\)]+all-spells[^\)]+\)/g;
      let isSpell = false;
      const newDesc = desc.replace(reg2, (match) => {
        let start = match.indexOf('[');
        let end = match.indexOf(']');
        let name = match.substring(start + 1, end);
        start = match.indexOf('(');
        end = match.indexOf(')');
        let purl = match.substring(start + 1, end);
        name = name.replace(/_/g, '');
        let url = undefined;
        // console.log(name);
        spells.forEach((newSpell) => {
          if (url) {
            return;
          }
          const newName = newSpell.name.split(',').reduce((acc, part) => part + ' ' + acc, '').trim();
          if (newName.toUpperCase() == name.trim().toUpperCase()) {
            url = newSpell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\\/]/g, '-').replace(/[’]/g, '_');
          }
        });
        if (!url)
          url = name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\\/]/g, '-').replace(/[’]/g, '_');
        return `[${name}](/spells/${url})`;
      });
      desc = newDesc;
      const reg3 = /_\[[^\]]+\]\([^\)]+\)_/g;
      desc = desc.replace(reg3, (match) => {
        return match.substring(1, match.length - 1);
      });
      spell.description = desc;
      if (spell.levels)
        spell.levels = spell.levels.split(',').map(function(level) {
          return level
            .replace(/\((?!unchained).+\)/g, '')
            .replace('unchained summoner', 'summoner (unchained)')
            .replace('sorcerer/ wizard', 'sorcerer/wizard')
            .replace('wizard/sorcerer', 'sorcerer/wizard')
            .trim();
        });
      if (spell.descripters)
        spell.descripters = spell.descripters.map(function(descripter) {
          return descripter
            .replace(/^or /g, '')
            .replace('mind affecting', 'mind-affecting')
            .replace('mind- affecting', 'mind-affecting')
            .trim();
        });
      if (spell.components)
        spell.components = spell.components.split(', ').map(function(component) {
          return component.trim();
        });
    });
    spells.forEach((spell) => {
      const manualSpell = manualSpells.find((mspell) => {
        return spell.name == mspell.name;
      });
      if (manualSpell) {
        Object.entries(manualSpell).forEach(([key, value]) => {
          spell[key] = value;
        });
      }
    });
    spells.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // ignore upper and lowercase
      var nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    const unique = ["Status, Greater"];
    const resultSpells = spells.filter((spell) => {
      const result = !unique.includes(spell.name);
      unique.push(spell.name);
      return result;
    });
    fs.writeFileSync('resources/spells.json', JSON.stringify(resultSpells, function replacer(key, value) {
      if (key === 'url') {
        return undefined;
      }
      return value;
    }, 4), 'utf8');
  } catch (e) {
    logError(e);
  }
}
format();

function logError(...arguments) {
  if (typeof(console) !== 'undefined') {
    arguments.unshift("\x1b[31m");
    arguments.push("\x1b[0m");
    console.log.apply(console, arguments);
  }
}

function logSuccess(...arguments) {
  if (typeof(console) !== 'undefined') {
    arguments.unshift("\x1b[32m");
    arguments.push("\x1b[0m");
    console.log.apply(console, arguments);
  }
}
