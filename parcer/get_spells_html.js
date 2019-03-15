const fs = require('fs');
const https = require('https');
const parse = require('node-html-parser').parse;
const spelllist = require('./res/spell_list.json');
const spellhtmls = require('./res/spell_htmls.json');
// const spelllistfailed = require('./res/spells_failed.json');
const spellsPrefixes = require('./spells_prefixes.json');
const spellsNumbers = require('./spells_numbers.json');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');
const turndownService = new TurndownService();
turndownService.use(turndownPluginGfm.gfm);

async function loadSpells() {
  try {
    fs.writeFileSync('parcer/res/spell_htmls.json', "[", 'utf8');
    for (let i = 0; i < spelllist.length; i++) {
      try {
        const spell = await getSpellHtml(spelllist[i]);
        logSuccess(i, "ok", spelllist[i]);
        if (i !== 0) {
          fs.appendFileSync('parcer/res/spell_htmls.json', ",", 'utf8');
        }
        fs.appendFileSync('parcer/res/spell_htmls.json', JSON.stringify(spell, null, 4), 'utf8');
      } catch (e) {
        logError(i, "Cant parse spell", spelllist[i]);
        logError("\t", e);
      }
    }
    fs.appendFileSync('parcer/res/spell_htmls.json', "]", 'utf8');
    logSuccess("Finished\n\n");
  } catch (e) {
    logError(e);
  }
}
loadSpells();

function getSpellHtml(url) {
  return new Promise(function(resolve, reject) {
    https.get(url, (res) => {
      const {statusCode} = res;
      const contentType = res.headers['content-type'];
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
      }
      if (error) {
        // console.error(error.message);
        reject(error);
        res.resume();
        return;
      }

      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        try {
          const rootVar = parse(rawData).querySelector("table");
          resolve(rootVar.innerHTML);
        } catch (e) {
          // console.error(e.message);
          reject(e);
        }
      });
    }).on('error', (e) => {
      // console.error(`Got error: ${e.message}`);
      reject(e);
    });
  });
}

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