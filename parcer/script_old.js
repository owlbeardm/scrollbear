const fs = require('fs');
const http = require('http');
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

// async function parseError() {
//   try {
//     fs.writeFileSync('parcer/f_spells.json', "[", 'utf8');
//     fs.writeFileSync('parcer/f_spells_failed.log', "", 'utf8');
//     let s = 0;
//     let f = 0;
//     for (let i = 0; i < 12 /*spelllistfailed.length*/ ; i++) {
//       try {
//         const spell = await getSpell(spelllistfailed[i]);
//         if (!spell.name)
//           throw "Spell has no Name";
//         if (!spell.school)
//           throw "Spell has no School";
//         if (!spell.description)
//           throw "Spell has no Description";
//
//          console.log(spell);
//         logSuccess(i, "ok", spell.name);
//         if (i !== 0) {
//           fs.appendFileSync('parcer/f_spells.json', ",", 'utf8');
//         }
//         fs.appendFileSync('parcer/f_spells.json', JSON.stringify(spell, null, 4), 'utf8');
//         s++;
//       } catch (e) {
//         logError(i, "Cant parse spell", spelllistfailed[i]);
//         logError("\t", e);
//         fs.appendFileSync('parcer/f_spells_failed.log', i + '\t' + spelllistfailed[i] + '\n', 'utf8');
//         fs.appendFileSync('parcer/f_spells_failed.log', "\t" + e + '\n', 'utf8');
//         f++;
//       }
//     }
//     fs.appendFileSync('parcer/f_spells.json', "]", 'utf8');
//     logSuccess("Finished\n\n");
//     logSuccess("Successed", s);
//     logError("Failed", f);
//   } catch (e) {
//     logError(e);
//   }
// }
//  parseError();

async function main_old() {
  try {
    fs.writeFileSync('parcer/res/spells.json', "[", 'utf8');
    fs.writeFileSync('parcer/res/spells_failed.log', "", 'utf8');
    let s = 0;
    let f = 0;
    for (let i = 37; i < 38/*spelllist.length*/; i++) {
      try {
        const spell = await getSpell(spelllist[i]);
        if (!spell.name)
          throw "Spell has no Name";
        if (!spell.school)
          throw "Spell has no School";
        if (!spell.description)
          throw "Spell has no Description";

        // console.log(spell);
        logSuccess(i, "ok", spell.name);
        if (i !== 0) {
          fs.appendFileSync('parcer/res/spells.json', ",", 'utf8');
        }
        fs.appendFileSync('parcer/res/spells.json', JSON.stringify(spell, null, 4), 'utf8');
        s++;
      } catch (e) {
        logError(i, "Cant parse spell", spelllist[i]);
        logError("\t", e);
        fs.appendFileSync('parcer/res/spells_failed.log', i + '\t' + spelllist[i] + '\n', 'utf8');
        fs.appendFileSync('parcer/res/spells_failed.log', "\t" + e + '\n', 'utf8');
        f++;
      }
    }
    fs.appendFileSync('parcer/res/spells.json', "]", 'utf8');
    logSuccess("Finished\n\n");
    logSuccess("Successed", s);
    logError("Failed", f);
  } catch (e) {
    logError(e);
  }
}
async function main() {
  try {
    fs.writeFileSync('parcer/res/spells.json', "[", 'utf8');
    fs.writeFileSync('parcer/res/spells_failed.log', "", 'utf8');
    let s = 0;
    let f = 0;
    spellhtmls.forEach((spellsHtml, index) => {
      // if(index!=37){
      //   return;
      // }
      try {
        const spells = parseSpellPage(parse(spellsHtml));
        spells.forEach((spell) => {
          if (!spell.name)
            throw "Spell has no Name";

          // if (!spell.description)
          //   throw "Spell has no Description";
          spell.url = spelllist[index];

          // console.log(spell);
          logSuccess(index, "ok", spell.name);
          if (index !== 0) {
            fs.appendFileSync('parcer/res/spells.json', ",", 'utf8');
          }
          fs.appendFileSync('parcer/res/spells.json', JSON.stringify(spell, null, 4), 'utf8');
          s++;
        });
      } catch (e) {
        logError(index, "Cant parse spell", spelllist[index]);
        logError("\t", e);
        fs.appendFileSync('parcer/res/spells_failed.log', index + "\t" + e + '\n', 'utf8');
        f++;
      }
    });
    fs.appendFileSync('parcer/res/spells.json', "]", 'utf8');
    logSuccess("Finished\n\n");
    logSuccess("Successed", s);
    logError("Failed", f);
  } catch (e) {
    logError(e);
  }
}
main();

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
// loadSpells();

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

// Name
function removeATag(data) {
  if (data.includes('<')) {
    const parsedData = parse('<p>' + data + '</p>');
    return parsedData.text.trim();
  }
  return data;
}
// School
function parseSpellSchool(data) {
  const school = /">(.*?)<\/a>[^)\]]/g;
  return data.match(school)[0].replace('">', '').replace('</a>', '').replace(';', '').trim();

}
//   (Subschool)
function parseSpellSubschool(data) {
  const subschool = /\((.*?)\)/g;
  const subschoolA = /\(<a(.*?)">(.*?)<\/a>\)/g;
  const subschoolA2 = />(.*?)<\/a>\)/g;
  const subschoolVar = data.match(subschool);
  if (subschoolVar)
    return removeATag(subschoolVar[0].substring(1, subschoolVar[0].length - 1).trim());
  }
//   [Descriptor]
function parseSpellDescriptor(data) {
  const descripters = /\[(.*?)\]/g;
  const descriptersA = /\[<a(.*?)">(.*?)<\/a>\]/g;
  const descriptersA2 = />(.*?)</g;
  const descriptersVar = data.match(descripters);
  if (descriptersVar)
    return descriptersVar[0].substring(1, descriptersVar[0].length - 1).split(',').map((value) => {
      return removeATag(value.trim())
    });
  }

function addValue(spell, value, name, key) {
  if (!spell[key] && value.innerHTML && value.innerHTML.toUpperCase().includes(name.toUpperCase())) {
    const array = value.innerHTML.split('<br />');
    array.forEach((line) => {
      if (!spell[key] && line.toUpperCase().includes(name.toUpperCase())) {
        spell[key] = removeATag(line.replace(new RegExp(name, "ig"), '')).trim();
      }
    });
  }
}

function setDescription(element, spell) {
  element.childNodes.forEach((value, index, elements) => {
    if (index > 1 && elements[index - 2].innerHTML === 'DESCRIPTION' && !spell.description) {
      let i = index;
      spell.description = undefined;
      while (elements[i] && (((!elements[i].classNames || !elements[i].classNames.includes('comments')) && (!elements[i].classNames || !elements[i].classNames.includes('section15')) && elements[i].tagName !== 'h4') || !elements[i].tagName)) {
        if (elements[i].childNodes.length && (elements[i].querySelector('h4') || elements[i].querySelector('.comments') || elements[i].querySelector('.section15'))) {
          break;
        }
        spell.description = (
          spell.description
          ? spell.description
          : "") + elements[i].toString();
        i++;
      }
    }
  });
}

function findDescription_(element, spell) {
  setDescription(element, spell);
  if (!spell.description && element.childNodes.length) {
    element.childNodes.forEach((value) => {
      if (!spell.description)
        findDescription_(value, spell);
      }
    );
  }
}

function findDescription(element, spell) {
  findDescription_(element, spell);
  spell.description = turndownService.turndown(spell.description);
}

function populateSpell(article, spell) {
  article.querySelectorAll('p').forEach((value) => {
    if (value.innerHTML && value.innerHTML.includes('<b>School</b>')) {
      if (!spell.school)
        spell.school = parseSpellSchool(value.innerHTML);
      if (!spell.subschool)
        spell.subschool = parseSpellSubschool(value.innerHTML);
      if (!spell.descripters)
        spell.descripters = parseSpellDescriptor(value.innerHTML);
      const levels = value.innerHTML.split(/;|\n|<br>|<br \/>|<br\/>/g)[1];
      if (!spell.levels)
        spell.levels = removeATag(levels.replace('<b>Level</b>', '')).trim();
      }
    addValue(spell, value, '<b>Casting Time</b>', 'castingTime');
    addValue(spell, value, 'Casting Time</b>', 'castingTime');
    addValue(spell, value, '<b>Components</b>', 'components');
    addValue(spell, value, 'Components</b>', 'components');
    addValue(spell, value, '<b>Component</b>', 'components');
    addValue(spell, value, 'Component</b>', 'components');
    addValue(spell, value, '<b>Target, Effect, or Area</b>', 'target');
    addValue(spell, value, '<b>Target, Effect, or Area</b>', 'effect');
    addValue(spell, value, '<b>Target, Effect, or Area</b>', 'area');
    addValue(spell, value, '<b>Target or Area</b>', 'target');
    addValue(spell, value, '<b>Target or Area</b>', 'area');
    addValue(spell, value, '<b>Range</b>', 'range');
    addValue(spell, value, 'Range</b>', 'range');
    addValue(spell, value, '<b>Area</b>', 'area');
    addValue(spell, value, 'Area</b>', 'area');
    if (!spell.targets)
      addValue(spell, value, '<b>Target</b>', 'target');
    if (!spell.target)
      addValue(spell, value, '<b>Targets</b>', 'targets');
    addValue(spell, value, '<b>Effect</b>', 'effect');
    addValue(spell, value, 'Effect</b>', 'effect');
    addValue(spell, value, '<b>Duration</b>', 'duration');
    addValue(spell, value, 'Duration</b>', 'duration');

    if (value.innerHTML && (value.innerHTML.toUpperCase().includes('<b>Saving Throw</b>'.toUpperCase()) || value.innerHTML.toUpperCase().includes('<b>Spell Resistance</b>'.toUpperCase()))) {
      const effect = value.innerHTML.split('<br />');
      effect.forEach((value) => {
        if (value.toUpperCase().includes('<b>Saving Throw</b>'.toUpperCase()) || value.toUpperCase().includes('<b>Spell Resistance</b>'.toUpperCase())) {
          const saving = value.split(';');
          saving.forEach((line) => {
            if (!spell.savingThrow && line.toUpperCase().includes('<b>Saving Throw</b>'.toUpperCase()))
              spell.savingThrow = removeATag(line.replace(new RegExp('<b>Saving Throw</b>', "ig"), '')).trim();
            if (!spell.spellResistance && line.toUpperCase().includes('<b>Spell Resistance</b>'.toUpperCase()))
              spell.spellResistance = removeATag(line.replace(new RegExp('<b>Spell Resistance</b>', "ig"), '')).trim();
            }
          );
        }
      });
    }
  });
}

function parseSpellPage(rootVar) {
  const result = [];
  const spell = {};
  spell.name = rootVar.querySelector('h1').text;
  let article = rootVar.querySelector('.article-content');
  populateSpell(article, spell);
  findDescription(article, spell);
  result.push(spell);
  article.childNodes.forEach((child, index, elements) => {
    spellsPrefixes.forEach((prefix) => {
      let value = undefined;
      try {
        if (child.innerHTML && child.innerHTML.includes(spell.name) && child.innerHTML.includes(prefix)) {
          let valueAdded = '<div>';
          for (let i = index; i < elements.length; i++) {
            valueAdded += elements[i].toString();
          }
          valueAdded += '</div>';
          value = parse(valueAdded);
          // console.log(valueAdded);
          const altSpell = {};
          altSpell.name = spell.name + ", " + prefix;
          populateSpell(value, altSpell);
          findDescription(value, altSpell);
          result.push(altSpell);
        }
      } catch (ex) {
        logError(ex);
        console.log(value.innerHTML);
      }
    });
    spellsNumbers.forEach((number, ind, elems) => {
      let value = undefined;
      try {
        if (child.innerHTML && child.innerHTML.includes(spell.name + " " + number)
         // && !child.innerHTML.includes(spell.name + " " + elems[ind+1])
       ) {
          let valueAdded = '<div>';
          for (let i = index; i < elements.length; i++) {
            valueAdded += elements[i].toString();
          }
          valueAdded += '</div>';
          value = parse(valueAdded);
          // console.log(valueAdded);
          const altSpell = {};
          altSpell.name = spell.name + " " + number;
          populateSpell(value, altSpell);
          findDescription(value, altSpell);
          result.push(altSpell);
        }
      } catch (ex) {
        logError(ex);
        console.log(value.innerHTML);
      }
    });
  });

  return result;
}

function getSpell_old(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, (res) => {
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
          const parsedData = parseSpellPage(rawData);
          parsedData.url = url;
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

function getSpellHtml(url) {
  return new Promise(function(resolve, reject) {
    http.get(url, (res) => {
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
          const rootVar = parse(rawData).querySelector("body").querySelector("article");
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
