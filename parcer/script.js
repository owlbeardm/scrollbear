const fs = require('fs');
const http = require('http');
const parse = require('node-html-parser').parse;
const spelllist = require('./spelllist.json');
// console.log(spelllist);
// const site = "http://www.d20pfsrd.com/magic/all-spells/b/boneshaker/";
// const resturl = spelllist[0];

async function main() {
  try {
    fs.writeFileSync('parcer/spells.json', "[", 'utf8');
    let s = 0;
    let f = 0;
    for (let i = 0; i < spelllist.length; i++) {
      try {
        const spell = await getSpell(spelllist[i]);
        // console.log(spell);
        logSuccess(i, "ok", spell.name);
        if (i !== 0) {
          fs.appendFileSync('parcer/spells.json', ",", 'utf8');
        }
        fs.appendFileSync('parcer/spells.json', JSON.stringify(spell), 'utf8');
        s++;
      } catch (e) {
        logError(i, "Cant parse spell", spelllist[i]);
        f++;
      }
    }
    fs.appendFileSync('parcer/spells.json', "]", 'utf8');
    logSuccess("Finished\n\n");
    logSuccess("Successed", s);
    logError("Failed", f);
  } catch (e) {
    logError(e);
  }
}
main();

function loadSpellList(parsedData) {
  const rootVar = parse(parsedData).querySelector("body").querySelector("article");
  const article = rootVar.querySelector('.article-content');
  const articlePs = article.querySelectorAll('li');
  const spelllist = JSON.stringify(articlePs.map((value) => {
    return value.querySelector('a').attributes.href
  }));
  // console.log(spelllist);
  fs.writeFileSync('spelllist.json', spelllist, 'utf8');
}

function parseSpellPage(parsedData) {
  const school = /">(.*?)<\/a>[^)\]]/g;
  const subschool = /\((.*?)\)/g;
  const subschoolA = /\(<a(.*?)">(.*?)<\/a>\)/g;
  const subschoolA2 = />(.*?)<\/a>\)/g;
  const descripters = /\[(.*?)\]/g;
  const descriptersA = /\[<a(.*?)">(.*?)<\/a>\]/g;
  const descriptersA2 = />(.*?)</g;

  const rootVar = parse(parsedData).querySelector("body").querySelector("article");
  const spell = {};
  spell.name = rootVar.querySelector('h1').text;
  const article = rootVar.querySelector('.article-content');
  const articlePs = article.querySelectorAll('p');
  // articlePs.forEach((value) => {
  //   console.log('\n\t*\n');
  //   console.log(value.innerHTML);
  // });
  // console.log(articlePs[0].innerHTML.match(descripters));

  spell.school = articlePs[0].innerHTML.match(school)[0].replace('">', '').replace('</a>', '').trim();
  const subschoolVar = articlePs[0].innerHTML.match(subschool);
  if (subschoolVar)
    spell.subschool = subschoolVar[0].substring(1, subschoolVar[0].length - 1).trim();
  const descriptersVar = articlePs[0].innerHTML.match(descripters);
  if (descriptersVar)
    spell.descripters = descriptersVar[0].substring(1, descriptersVar[0].length - 1).split(',').map((value) => {
      return value.trim()
    });
  spell.description = articlePs.reduce((accumulator, currentValue, currentIndex) => {
    if (currentIndex < 6) {
      return '';
    }
    if (currentIndex > articlePs.length - 3) {
      return accumulator;
    }
    return accumulator + currentValue.removeWhitespace().text + '\n';
  }).trim();

  // console.log(JSON.stringify(spell));
  return spell;
}

function getSpell(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, (res) => {
      const {
        statusCode
      } = res;
      const contentType = res.headers['content-type'];
      let error;
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
          `Status Code: ${statusCode}`);
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
          const parsedData = parseSpellPage(rawData);
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
