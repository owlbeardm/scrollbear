const fs = require('fs');
const http = require('http');
const spells = require('./spells.json');

async function main() {
  try {
    const classes = {};
    spells.forEach((value) => {
      value.levels.split(', ').forEach((classLevel) => {
        const className = classLevel.substring(0, classLevel.length - 2);
        // classes[className] = true;
        // if(className.includes('cleric/oracle'))
        if (className == 'community')
          console.log(value);
      });
    });
    // console.log(classes);
    logSuccess("Finished\n\n");
  } catch (e) {
    logError(e);
  }
}

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
        const start = match.indexOf('[');
        const end = match.indexOf(']');
        const name = match.substring(start + 1, end);
        const url = name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
        return `[${name}](/spells/${url})`;
      });
      desc = newDesc;
      spell.description = desc;
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
    fs.writeFileSync('resources/spells.json', JSON.stringify(spells, function replacer(key, value) {
      if (key === 'url') {
        return undefined;
      }
      return value;
    }, 4), 'utf8');
  } catch (e) {
    logError(e);
  }
}
// main();
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
