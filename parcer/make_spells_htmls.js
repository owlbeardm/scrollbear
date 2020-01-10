const fs = require('fs');
const spells = require('../resources/spells.json');

function replaceParam(spellHtml, param, value) {
  const reg = new RegExp(`<%=[^%]+${param}[^%]+%>`, "g");
  return spellHtml.replace(reg, value);
}

async function main() {
  try {
    const spellHtml = fs.readFileSync('assets/spell.ejs', 'utf8');
    let s = 0;
    spells.forEach((spell, index) => {
      // if (index != 0) {
      //   return;
      // }
      const spellUrl = spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]\//g, '-').replace(/[’]/g, '_');
      let html = spellHtml;
      html = replaceParam(html, "title", `${spell.name} - ScrollBear`)
      html = replaceParam(html, "description", spell.description)
      html = replaceParam(html, "url", spellUrl);
      try {
        fs.writeFileSync('dist/spells/' + spellUrl + '.html', html, 'utf8');
        s++;
      } catch (e) {
        logError(e);
      }

    });
    logSuccess("Finished\n\n");
    logSuccess("Successed", s);
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
