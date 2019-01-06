const fs = require('fs');
const spells = require('../resources/spells.json');
// console.log(spelllist);
// const site = "http://www.d20pfsrd.com/magic/all-spells/b/boneshaker/";
// const resturl = spelllist[0];

async function main() {
  try {
    console.log(spells.length);
    fs.writeFileSync('parcer/sitemap.txt', "https://scrollbear.com/\n", 'utf8');
    spells.forEach((spell)=>{
      const url = `https://scrollbear.com/spells/${spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_')}\n`;
      console.log(url);
      fs.appendFileSync('parcer/sitemap.txt', url, 'utf8');
    });
    logSuccess("Finished\n\n");
  } catch (e) {
    logError(e);
  }
}
main();

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
