const fs = require('fs');
const http = require('http');
const spells = require('./spells.json');

async function main() {
  try {
    const description = "You restore the senses to the severed head of a [humanoid](https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types#TOC-Monstrous-Humanoid) or [monstrous humanoid](https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types#TOC-Monstrous-Humanoid) killed within the past 24 hours, creating a grisly sentinel. The head must be affixed to a pole, [spear](https://www.d20pfsrd.com/equipment/weapons/weapon-descriptions/spear), tree branch, or other stable object, and the spell ends if the head or its object is moved. The head has [darkvision](https://www.d20pfsrd.com/gamemastering/special-abilities#TOC-Darkvision) 60 feet and [low-light vision](https://www.d20pfsrd.com/gamemastering/special-abilities#TOC-Low-Light-Vision), can swivel in place to look in any direction, and has a +5 bonus on [Perception](https://www.d20pfsrd.com/skills/perception) checks.\n\nIf you are within 30 feet of the head, as a [standard action](https://www.d20pfsrd.com/gamemastering/combat#TOC-Standard-Actions) you can shift your senses to it, seeing and hearing from its location and gaining the benefit of its [darkvision](https://www.d20pfsrd.com/gamemastering/special-abilities#TOC-Darkvision) and [low-light vision](https://www.d20pfsrd.com/gamemastering/special-abilities#TOC-Low-Light-Vision), and you may use its [Perception](https://www.d20pfsrd.com/skills/perception) skill instead of your own. While your senses are in the severed head, your body is [blind](https://www.d20pfsrd.com/gamemastering/conditions#TOC-Blinded) and [deaf](https://www.d20pfsrd.com/gamemastering/conditions#TOC-Deafened) until you spend a [free action](https://www.d20pfsrd.com/gamemastering/combat#TOC-Free-Actions) to shift your senses back to your own body.\n\nWhen you create the head, you can imprint it with a single triggering condition, similar to [magic mouth](https://www.d20pfsrd.com/magic/all-spells/m/magic-mouth). Once this triggering condition is set, it can never be changed. If you are within 30 feet of the head, you immediately know if it is triggered (if you have multiple active sentry skulls, you also know which one was triggered). This wakens you from normal sleep but does not otherwise disturb your [concentration](https://www.d20pfsrd.com/magic#TOC-Concentration). For example, you could have a sentry skull alert you if any [humanoid](https://www.d20pfsrd.com/bestiary/rules-for-monsters/creature-types#TOC-Humanoid) comes into view, if a particular rival approaches, if your guard animal is killed, and so on, as long as it occurs where the severed head can see it.\n\nThis spell does not give the head any ability to speak, think, or take any kind of action other than to turn itself, though it is a suitable target for other spells such as [magic mouth](https://www.d20pfsrd.com/magic/all-spells/m/magic-mouth)."
    const reg = /\[[^\]]+\]\(([^\)](?!all-spells))+\)/g;
    const newDesc = description.replace(reg, (match) => {
      const start = match.indexOf('[');
      const end = match.indexOf(']');
      return match.substring(start + 1, end);
    });
    // console.log(newDesc);
    const reg2 = /\[[^\]]+\]\([^\)]+all-spells[^\)]+\)/g;
    const newDesc2 = newDesc.replace(reg2, (match) => {
      const start = match.indexOf('[');
      const end = match.indexOf(']');
      const name = match.substring(start + 1, end);
      const url = name.toLowerCase().trim().replace(/[.*+?^$ ,{}()|[\]\\\/]/g, '-').replace(/[’]/g, '_');
      return `[${name}](/spells/${url})`;
    });
    console.log(newDesc2);
    logSuccess("Finished\n\n");
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
