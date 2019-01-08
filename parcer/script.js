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
        if (!spell.castingTime)
          throw "Spell has no Casting Time";
        if (!spell.components)
          throw "Spell has no Components";
        if (!spell.duration)
          throw "Spell has no Duration";
        if (!spell.description)
          throw "Spell has no Description";

        // console.log(spell);
        logSuccess(i, "ok", spell.name);
        if (i !== 0) {
          fs.appendFileSync('parcer/spells.json', ",", 'utf8');
        }
        fs.appendFileSync('parcer/spells.json', JSON.stringify(spell), 'utf8');
        s++;
      } catch (e) {
        logError(i, "Cant parse spell", spelllist[i]);
        logError("\t", e);
        fs.appendFileSync('parcer/spells_failed.log', i + '\t' + spelllist[i], 'utf8');
        fs.appendFileSync('parcer/spells_failed.log', "\t" + e, 'utf8');
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
  const tempDiv = article.querySelector('div');
  if (!tempDiv.classNames.length) {
    article = tempDiv;
  }
  article.childNodes.forEach((value, index, elements) => {
    if (value.innerHTML && value.innerHTML.includes('School')) {
      spell.school = parseSpellSchool(value.innerHTML);
      spell.subschool = parseSpellSubschool(value.innerHTML);
      spell.descripters = parseSpellDescriptor(value.innerHTML);
      const levels = value.innerHTML.split(';')[1];
      spell.levels = removeATag(levels.replace('<b>Level</b>', '')).trim();
    } else if (index > 1 && elements[index - 2].innerHTML === 'CASTING') {
      const casting = value.innerHTML.split('<br />');
      spell.castingTime = removeATag(casting[0].replace('<b>Casting Time</b>', '')).trim();
      spell.components = removeATag(casting[1].replace('<b>Components</b>', '')).trim();
    } else if (index > 1 && elements[index - 2].innerHTML === 'EFFECT') {
      const effect = value.innerHTML.split('<br />');
      effect.forEach((value) => {
        if (value.includes('Range')) {
          spell.range = removeATag(value.replace('<b>Range</b>', '')).trim();
        } else if (value.includes('Area')) {
          spell.area = removeATag(value.replace('<b>Area</b>', '')).trim();
        } else if (value.includes('Target')) {
          spell.target = removeATag(value.replace('<b>Target</b>', '')).trim();
        } else if (value.includes('Targets')) {
          spell.targets = removeATag(value.replace('<b>Targets</b>', '')).trim();
        } else if (value.includes('Effect')) {
          spell.effect = removeATag(value.replace('<b>Effect</b>', '')).trim();
        } else if (value.includes('Duration')) {
          spell.duration = removeATag(value.replace('<b>Duration</b>', '')).trim();
        } else if (value.includes('Saving Throw')) {
          const saving = value.split(';');
          spell.savingThrow = removeATag(saving[0].replace('<b>Saving Throw</b>', '')).trim();
          spell.spellResistance = removeATag(saving[1].replace('<b>Spell Resistance</b>', '')).trim();
        }
      });
    } else if (index > 1 && elements[index - 2].innerHTML === 'DESCRIPTION') {
      let i = index;
      spell.description = '';
      while (elements[i] && (elements[i].tagName === 'p' || !elements[i].tagName)) {
        spell.description = spell.description + elements[i].text;
        i++;
      }
    }
  });

  // spell.school = parseSpellName(articlePs[0].innerHTML);
  // const subschoolVar = articlePs[0].innerHTML.match(subschool);
  // if (subschoolVar)
  //   spell.subschool = subschoolVar[0].substring(1, subschoolVar[0].length - 1).trim();

  // spell.description = articlePs.reduce((accumulator, currentValue, currentIndex) => {
  //   if (currentIndex < 6) {
  //     return '';
  //   }
  //   if (currentIndex > articlePs.length - 3) {
  //     return accumulator;
  //   }
  //   return accumulator + currentValue.removeWhitespace().text + '\n';
  // }).trim();

  // console.log(spell);
  return spell;
}

function getSpell(url) {
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
