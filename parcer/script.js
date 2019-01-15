const fs = require('fs');
const http = require('http');
const parse = require('node-html-parser').parse;
const spelllist = require('./spelllist.json');
const TurndownService = require('turndown');
const turndownPluginGfm = require('turndown-plugin-gfm');
const turndownService = new TurndownService();
turndownService.use(turndownPluginGfm.gfm);

async function main() {
  try {
    fs.writeFileSync('parcer/spells.json', "[", 'utf8');
    fs.writeFileSync('parcer/spells_failed.log', "", 'utf8');
    let s = 0;
    let f = 0;
    for (let i = 0; i < spelllist.length; i++) {
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
          fs.appendFileSync('parcer/spells.json', ",", 'utf8');
        }
        fs.appendFileSync('parcer/spells.json', JSON.stringify(spell, null, 4), 'utf8');
        s++;
      } catch (e) {
        logError(i, "Cant parse spell", spelllist[i]);
        logError("\t", e);
        fs.appendFileSync('parcer/spells_failed.log', i + '\t' + spelllist[i] + '\n', 'utf8');
        fs.appendFileSync('parcer/spells_failed.log', "\t" + e + '\n', 'utf8');
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

function parseSpellPage(parsedData) {
  const rootVar = parse(parsedData).querySelector("body").querySelector("article");
  const spell = {};
  spell.name = rootVar.querySelector('h1').text;
  let article = rootVar.querySelector('.article-content');
  article.querySelectorAll('p').forEach((value) => {
    if (value.innerHTML && value.innerHTML.includes('<b>School</b>')) {
      if (!spell.school)
        spell.school = parseSpellSchool(value.innerHTML);
      if (!spell.subschool)
        spell.subschool = parseSpellSubschool(value.innerHTML);
      if (!spell.descripters)
        spell.descripters = parseSpellDescriptor(value.innerHTML);
      const levels = value.innerHTML.split(';')[1];
      if (!spell.levels)
        spell.levels = removeATag(levels.replace('<b>Level</b>', '')).trim();
    } else if (value.innerHTML && (value.innerHTML.includes('<b>Casting Time</b>') ||
        value.innerHTML.includes('<b>Components</b>'))) {
      const casting = value.innerHTML.split('<br />');
      if (!spell.castingTime)
        spell.castingTime = removeATag(casting[0].replace('<b>Casting Time</b>', '')).trim();
      if (!spell.components)
        spell.components = removeATag(casting[1].replace('<b>Components</b>', '')).trim();
    } else if (value.innerHTML && (value.innerHTML.includes('<b>Range</b>') ||
        value.innerHTML.includes('<b>Area</b>') ||
        value.innerHTML.includes('<b>Target</b>') ||
        value.innerHTML.includes('<b>Effect</b>') ||
        value.innerHTML.includes('<b>Duration</b>') ||
        value.innerHTML.includes('<b>Saving Throw</b>') ||
        value.innerHTML.includes('<b>Spell Resistance</b>'))) {
      const effect = value.innerHTML.split('<br />');
      effect.forEach((value) => {
        if (value.includes('Range') && !spell.range) {
          spell.range = removeATag(value.replace('<b>Range</b>', '')).trim();
        } else if (value.includes('Area') && !spell.area) {
          spell.area = removeATag(value.replace('<b>Area</b>', '')).trim();
        } else if (value.includes('Target') && !spell.target) {
          spell.target = removeATag(value.replace('<b>Target</b>', '')).trim();
        } else if (value.includes('Targets') && !spell.targets && !spell.target) {
          spell.targets = removeATag(value.replace('<b>Targets</b>', '')).trim();
        } else if (value.includes('Effect') && !spell.effect) {
          spell.effect = removeATag(value.replace('<b>Effect</b>', '')).trim();
        } else if (value.includes('Duration') && !spell.duration) {
          spell.duration = removeATag(value.replace('<b>Duration</b>', '')).trim();
        } else if (value.includes('Saving Throw')) {
          const saving = value.split(';');
          if (!spell.savingThrow)
            spell.savingThrow = removeATag(saving[0].replace('<b>Saving Throw</b>', '')).trim();
          if (!spell.spellResistance)
            spell.spellResistance = removeATag(saving[1].replace('<b>Spell Resistance</b>', '')).trim();
        }
      });
    }
  });

  article.childNodes.forEach((value, index, elements) => {
    if (index > 1 && elements[index - 2].innerHTML === 'DESCRIPTION' && !spell.description) {
      let i = index;
      spell.description = undefined;
      while (
        elements[i] &&
        (
          (
            (!elements[i].classNames || !elements[i].classNames.includes('comments')) &&
            (!elements[i].classNames || !elements[i].classNames.includes('section15')) &&
            elements[i].tagName !== 'h4') ||
          !elements[i].tagName
        )
      ) {
        if (elements[i].childNodes.length && (elements[i].querySelector('h4') ||
            elements[i].querySelector('.comments') ||
            elements[i].querySelector('.section15')
          )) {
          break;
        }
        spell.description = (spell.description ? spell.description : "") + elements[i].toString();
        i++;
      }
    }
  });
  spell.description = turndownService.turndown(spell.description);

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
