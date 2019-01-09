const fs = require('fs');
const spells = require('../resources/spells.json');
// console.log(spelllist);
// const site = "http://www.d20pfsrd.com/magic/all-spells/b/boneshaker/";
// const resturl = spelllist[0];

async function main() {
  try {
    const stats = fs.statSync("resources/spells.json");
    const mtime = new Date(stats.mtime).toISOString();
    fs.writeFileSync('assets/sitemap.xml', "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n", 'utf8');
    fs.appendFileSync('assets/sitemap.xml', '<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\">\n', 'utf8');
    fs.appendFileSync('assets/sitemap.xml', '\t<url>\n', 'utf8');
    fs.appendFileSync('assets/sitemap.xml', `\t\t<loc>https://scrollbear.com/</loc>\n`, 'utf8');
    fs.appendFileSync('assets/sitemap.xml', `\t\t<lastmod>${(new Date()).toISOString()}</lastmod>\n`, 'utf8');
    fs.appendFileSync('assets/sitemap.xml', '\t</url>\n', 'utf8');
    spells.forEach((spell) => {
      fs.appendFileSync('assets/sitemap.xml', '\t<url>\n', 'utf8');
      const url = `https://scrollbear.com/spells/${spell.name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\]/g, '-').replace(/[’]/g, '_')}`;
      fs.appendFileSync('assets/sitemap.xml', `\t\t<loc>${url}</loc>\n`, 'utf8');
      fs.appendFileSync('assets/sitemap.xml', `\t\t<lastmod>${mtime}</lastmod>\n`, 'utf8');
      fs.appendFileSync('assets/sitemap.xml', '\t</url>\n', 'utf8');
    });
    fs.appendFileSync('assets/sitemap.xml', '</urlset>', 'utf8');
    logSuccess(`\n\nFinished sitemap with ${spells.length+1} links \n\tCurrent date     ${(new Date()).toISOString()} \n\tspells.json date ${mtime} \n\n`);
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
