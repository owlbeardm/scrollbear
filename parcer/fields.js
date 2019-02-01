const fs = require('fs');
const spells = require('../resources/spells.json');

async function fields() {
  try {
    const fields = {};
    spells.forEach((spell) => {
      Object.keys(spell).forEach((key) => {
        if (key === 'description' ||
          key === 'url' ||
          key === 'name' ||
          // key === 'levels' ||
          key === 'components'
        ) {
          return;
        }
        if (!fields[key]) {
          fields[key] = {};
        }
        if (!Array.isArray(spell[key])) {
          if (!fields[key][spell[key]]) {
            fields[key][spell[key]] = 1;
          } else {
            fields[key][spell[key]]++;
          }
        } else {
          spell[key].forEach((valueL)=>{
            const value = valueL.substring(0, valueL.length);
            if (!fields[key][value]) {
              fields[key][value] = 1;
            } else {
              fields[key][value]++;
            }
          });
        }
      });
    });
    const result = {};
    Object.keys(fields).forEach((key) => {
      result[key] = {};
      Object.entries(fields[key]).sort((a, b) => {
        const dif = b[1] - a[1];
        return dif != 0 ? dif : ((a[0] < b[0]) ? -1 : (a[0] > b[0]) ? 1 : 0);
      }).forEach((entry) => {
        result[key][entry[0]] = entry[1];
      });
    });

    fs.writeFileSync('parcer/fields.json', JSON.stringify(result, null, 4), 'utf8');
  } catch (e) {
    logError(e);
  }
}
fields();

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
