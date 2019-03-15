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

async function main() {
  try {
    fs.writeFileSync('parcer/res/spells.json', "[", 'utf8');
    fs.writeFileSync('parcer/res/spells_failed.log', "", 'utf8');
    let s = 0;
    let f = 0;
    spellhtmls.forEach((spellsHtml, index) => {
      // if (index != 0) {
      //   return;
      // }
      try {
        const spells = parseSpellPage(parse(spellsHtml));
        spells.forEach((spell) => {
          if (!spell.name)
            throw "Spell has no Name";

          if (!spell.description)
            throw "Spell has no Description";
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
  const school1 = /(.*?)\(/g;
  const school2 = /(.*?)\[/g;
  let schoolVar;
  if (data.includes('(')) {
    schoolVar = data.match(school1)[0];
    schoolVar = schoolVar.substring(0, schoolVar.length - 1);
  } else if (data.includes('[')) {
    schoolVar = data.match(school2)[0];
    schoolVar = schoolVar.substring(0, schoolVar.length - 1);
  } else {
    schoolVar = data;
  }
  return schoolVar.replace('">', '').replace('</a>', '').replace(';', '').trim();

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

function addValue(spell, child, nextChild, name, key) {
  if (child.toString() == name) {
    spell[key] = nextChild.toString().replace(';', '').trim();
  }
}

function setDescription(element, spell) {
  element.childNodes.forEach((value, index, elements) => {
    if (index > 1 && elements[index - 1].innerHTML === 'Description' && !spell.description) {
      let i = index;
      spell.description = undefined;
      while (elements[i] && (((!elements[i].classNames || !elements[i].classNames.includes('comments')) && (!elements[i].classNames || !elements[i].classNames.includes('section15')) && elements[i].tagName !== 'h1') || !elements[i].tagName)) {
        if (elements[i].childNodes.length && (elements[i].querySelector('h1') || elements[i].querySelector('.comments') || elements[i].querySelector('.section15'))) {
          break;
        }
        spell.description = (
          spell.description ?
          spell.description :
          "") + elements[i].toString();
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
    });
  }
}

function findDescription(element, spell) {
  findDescription_(element, spell);
  spell.description = spell.description.replace(/h2/gi, 'h4');
  spell.description = turndownService.turndown(spell.description);
}

function populateSpell(article, spell) {
  article.firstChild.childNodes.forEach((child, index, elements) => {
    const nextChild = elements[index + 1];
    if (!spell.source && child.toString() == "<b>Source</b>") {
      let addSource = false;
      let valueAdded = '<div>';
      for (let i = index + 1; i < elements.length; i++) {
        if (elements[i].toString() == "<b>School</b>") {
          addSource = true;
          break;
        }
        valueAdded += elements[i].toString();
      }
      valueAdded += '</div>';
      if (addSource) {
        spell.source = turndownService.turndown(parse(valueAdded).toString());
      }
    }
    if (!spell.school && child.toString() == "<b>School</b>") {
      spell.school = parseSpellSchool(nextChild.text);
      spell.subschool = parseSpellSubschool(nextChild.text);
      spell.descripters = parseSpellDescriptor(nextChild.text);
    }
    if (!spell.levels && child.toString() == "<b>Level</b>") {
      spell.levels = nextChild.text;
    }
    addValue(spell, child, nextChild, '<b>Casting Time</b>', 'castingTime');
    addValue(spell, child, nextChild, 'Casting Time</b>', 'castingTime');
    addValue(spell, child, nextChild, '<b>Components</b>', 'components');
    addValue(spell, child, nextChild, 'Components</b>', 'components');
    addValue(spell, child, nextChild, '<b>Component</b>', 'components');
    addValue(spell, child, nextChild, 'Component</b>', 'components');
    addValue(spell, child, nextChild, '<b>Target, Effect, or Area</b>', 'target');
    addValue(spell, child, nextChild, '<b>Target, Effect, or Area</b>', 'effect');
    addValue(spell, child, nextChild, '<b>Target, Effect, or Area</b>', 'area');
    addValue(spell, child, nextChild, '<b>Target or Area</b>', 'target');
    addValue(spell, child, nextChild, '<b>Target or Area</b>', 'area');
    addValue(spell, child, nextChild, '<b>Range</b>', 'range');
    addValue(spell, child, nextChild, 'Range</b>', 'range');
    addValue(spell, child, nextChild, '<b>Area</b>', 'area');
    addValue(spell, child, nextChild, 'Area</b>', 'area');
    if (!spell.targets)
      addValue(spell, child, nextChild, '<b>Target</b>', 'target');
    if (!spell.target)
      addValue(spell, child, nextChild, '<b>Targets</b>', 'targets');
    addValue(spell, child, nextChild, '<b>Effect</b>', 'effect');
    addValue(spell, child, nextChild, 'Effect</b>', 'effect');
    addValue(spell, child, nextChild, '<b>Duration</b>', 'duration');
    addValue(spell, child, nextChild, 'Duration</b>', 'duration');
    addValue(spell, child, nextChild, '<b>Saving Throw</b>', 'savingThrow');
    addValue(spell, child, nextChild, '<b>Spell Resistance</b>', 'spellResistance');
  });
}

function changeName(name) {
  return name.replace('1', 'I')
    .replace('2', 'II')
    .replace('3', 'III')
    .replace('4', 'IV')
    .replace('5', 'V')
    .replace('6', 'VI')
    .replace('7', 'VII')
    .replace('8', 'VIII')
    .replace('9', 'IX');
}

function parseSpellPage(rootVar) {
  const result = [];
  let span = [...rootVar.querySelectorAll('span')].find((element) => {
    return !!element.innerHTML;
  });
  let source;
  span.childNodes.forEach((child, index, elements) => {
    if (!source && child.toString() == "<b>Source</b>") {
      let valueAdded = '<div>';
      for (let i = index + 1; i < elements.length; i++) {
        if (elements[i].toString() == "<b>School</b>")
          break;
        valueAdded += elements[i].toString();
      }
      valueAdded += '</div>';
      source = turndownService.turndown(parse(valueAdded).toString());
    }
  });
  span.childNodes.forEach((child, index, elements) => {
    if (child.innerHTML && child.tagName === 'h1') {
      let valueAdded = '<div>';
      for (let i = index; i < elements.length; i++) {
        valueAdded += elements[i].toString();
      }
      valueAdded += '</div>';
      value = parse(valueAdded);
      // console.log(valueAdded);
      const spell = {};
      spell.name = changeName(child.text.trim());
      populateSpell(value, spell);
      findDescription(value, spell);
      if (!spell.source) {
        spell.source = source;
      }
      result.push(spell);
    }
  });
  // console.log(JSON.stringify(result));
  return result;
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
