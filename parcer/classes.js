const fs = require('fs');
const http = require('http');
const spells = require('./spells.json');

async function main() {
  try {
    const classes = {};
    spells.forEach((value) => {
      value.levels.split(', ').forEach((classLevel) => {
        const className = classLevel.substring(0,classLevel.length-2);
        // classes[className] = true;
        // if(className.includes('cleric/oracle'))
        if(className == 'community')
        console.log(value);
      });
    });
    // console.log(classes);
    logSuccess("Finished\n\n");
  } catch (e) {
    logError(e);
  }
}

async function format() {
  try {
    fs.writeFileSync('parcer/spells.json', JSON.stringify(spells, null, 4), 'utf8');
  } catch (e) {
    logError(e);
  }
}
// main();
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
