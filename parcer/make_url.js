const spellListUrl = 'https://aonprd.com/Spells.aspx?Class=All';
const spell_list_file = 'parcer/res/spell_list.json';

const fs = require('fs');
const https = require('https');
const parse = require('node-html-parser').parse;
const spelllist = require('./spelllist.json');
const spellhtmls = require('./res/spell_htmls.json');
// const spelllistfailed = require('./res/spells_failed.json');
const spellsPrefixes = require('./spells_prefixes.json');
const spellsNumbers = require('./spells_numbers.json');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');
const turndownService = new TurndownService();
turndownService.use(turndownPluginGfm.gfm);

async function main() {
  try {
    getSpellList(spellListUrl).then((data) => {
      console.log(data);
      fs.writeFileSync(spell_list_file, JSON.stringify(data), 'utf8');
    });
  } catch (e) {
    logError(e);
  }
}
main();

function getSpellList(url) {
  return new Promise(function(resolve, reject) {
    https.get(url, (res) => {
      const {
        statusCode
      } = res;
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
          const parsedData = parseSpellListPage(rawData);
          resolve(parsedData);
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

function parseSpellListPage(rawData) {
  const regexp = /href="SpellDisplay\.aspx[^>]+"/g;
  let array = [];
  rawData.toString().replace(regexp, (match) => {
    array.push('https://aonprd.com/' + match.substr(6, match.length - 7));
  });
  return array;
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
