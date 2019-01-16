const fs = require('fs');
const http = require('http');
const spells = require('./spells.json');

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
        let url = name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
        // spells.forEach((newSpell) => {
        //   const spArr = purl.split("/");
        //   const nspArr = newSpell.url.split("/");
        //   // console.log(spArr, nspArr);
        //
        //   if (spArr[spArr.length - (
        //       spArr[spArr.length - 1] == ''
        //       ? 2
        //       : 1)] == nspArr[nspArr.length - (
        //       nspArr[nspArr.length - 1] == ''
        //       ? 2
        //       : 1)]) {
        //     url = newSpell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_');
        //   }
        // });
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
