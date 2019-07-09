const fs = require('fs');

async function fields() {
  try {
    const rl = require('readline').createInterface({
      input: fs.createReadStream('parcer/sample/license_test.md')
    });
    const lines = [];

    rl.on('line', (line) => {
      let added = false;
      template.forEach((temp) => {
        if (!added && line.toUpperCase().includes(temp.toUpperCase())) {
          lines.push(line.trim());
          added = true;
        }
      });
    }).on('close', () => {
      fs.writeFileSync('parcer/res/license_list.md', "\n", 'utf8');
      template.forEach((temp) => {
        const linesForTemp = lines.filter((line) => {
          return line.toUpperCase().includes(temp.toUpperCase());
        })
        const incl = linesForTemp.length;
        const result = linesForTemp.reduce((accumulator, currentValue) => {
          if (accumulator.length < currentValue.length) {
            return currentValue;
          } else {
            return accumulator;
          }
        }, "- " + temp);
        fs.appendFileSync('parcer/res/license_list.md', `${result}\n`, 'utf8');
        if (incl == 1) {
          logSuccess(result, incl);
        } else if (incl > 1) {
          console.log(" " + result, incl);
        } else {
          logError(result, incl);
        }
      });
      console.log(template.length);
      process.exit(0);
    });
  } catch (e) {
    logError(e);
  }
}
fields();


const template = [
  "PRPG Core Rulebook",
  "Advanced Class Guide",
  "Advanced Player's Guide",
  "Advanced Race Guide",
  "Occult Adventures",
  "Ultimate Combat",
  "Ultimate Intrigue",
  "Ultimate Magic",
  "Advanced Class Origins",
  "Adventurer's Armory 2",
  "Adventurer's Guide",
  "Agents of Evil",
  "Animal Archive",
  "Aquatic Adventures",
  "Arcane Anthology",
  "Armor Master's Handbook",
  "Black Markets",
  "Blood of Shadows",
  "Blood of the Ancients",
  "Blood of the Beast",
  "Blood of the Coven",
  "Blood of the Elements",
  "Blood of the Moon",
  "Blood of the Night",
  "Blood of the Sea",
  "Book of the Damned",
  "Book of the Damned - Volume 3: Horsemen of the Apocalypse",
  "Champions of Balance",
  "Champions of Corruption",
  "Champions of Purity",
  "Cheliax, Empire of Devils",
  "Chronicle of the Righteous",
  "Classic Treasures Revisited",
  "Cohorts and Companions",
  "Conquest of Bloodsworn Vale",
  "Curse of the Crimson Throne (PFRPG)",
  "Dark Markets - A Guide to Katapesh",
  "Demon Hunter's Handbook",
  "Demons Revisited",
  "Dirty Tactics Toolbox",
  "Disciple's Doctrine",
  "Distant Realms",
  "Divine Anthology",
  "Dragon Empires Primer",
  "Dragonslayer's Handbook",
  "Dungeon Denizens Revisited",
  "Dungeoneer's Handbook",
  "Dungeons of Golarion",
  "Dwarves of Golarion",
  "Elemental Master's Handbook",
  "Faction Guide",
  "Faiths and Philosophies",
  "Faiths of Corruption",
  "Faiths of Purity",
  "Familiar Folio",
  "GameMastery Condition Cards",
  "Giant Hunter's Handbook",
  "Gnomes of Golarion",
  "Goblins of Golarion",
  "Gods and Magic",
  "Guardians of Dragonfall",
  "Guide to the River Kingdoms",
  "Haunted Heroes Handbook",
  "Healer's Handbook",
  "Hell's Vengeance Player's Guide",
  "Heroes from the Fringe",
  "Heroes of the Darklands",
  "Heroes of the High Court",
  "Heroes of the Streets",
  "Heroes of the Wild",
  "Horror Adventures",
  "Humans of Golarion",
  "Inner Sea Gods",
  "Inner Sea Intrigue",
  "Inner Sea Magic",
  "Inner Sea Monster Codex",
  "Inner Sea Races",
  "Inner Sea Temples",
  "Inner Sea World Guide",
  "Knights of the Inner Sea",
  "Kobolds of Golarion",
  "Lands of the Linnorm Kings",
  "Legacy of Dragons",
  "Legacy of the First World",
  "Lost Kingdoms",
  "Magical Marketplace",
  "Magic Tactics Toolbox",
  "Melee Tactics Toolbox",
  "Monster Codex",
  "Monster Hunter's Handbook",
  "Monster Summoner's Handbook",
  "Mythic Adventures",
  "Mythic Origins",
  "Occult Mysteries",
  "Occult Origins",
  "Occult Realms",
  "Orcs of Golarion",
  "Osirion, Legacy of the Pharaohs",
  "Paizo Blog - Ultimate Cantrips",
  "Pathfinder #102: Breaking the Bones of Hell",
  "Pathfinder #107: Scourge of the Godclaw",
  "Pathfinder #110: The Thrushmoor Terror",
  "Pathfinder #113: What Grows Within",
  "Pathfinder #115: Trail of the Hunted",
  "Pathfinder #116: Fangs of War",
  "Pathfinder #117: Assault on Longshadow",
  "Pathfinder #119: Prisoners of the Blight",
  "Pathfinder #131: The Reaper's Right Hand",
  "Pathfinder #134: It Came from Hollow Mountain",
  "Pathfinder #14: Children of the Void",
  "Pathfinder #19: Howl of the Carrion King",
  "Pathfinder #24: The Final Wish",
  "Pathfinder #29: Mother of Flies",
  "Pathfinder #30: The Twice-Damned Prince",
  "Pathfinder #35: War of the River Kings",
  "Pathfinder #42: Sanctum of the Serpent God",
  "Pathfinder #55: The Wormwood Mutiny",
  "Pathfinder #56: Raiders of the Fever Sea",
  "Pathfinder #62: Curse of the Lady's Light",
  "Pathfinder #64: Beyond the Doomsday Door",
  "Pathfinder #65: Into the Nightmare Rift",
  "Pathfinder #67: The Snows of Summer",
  "Pathfinder #68: The Shackled Hut",
  "Pathfinder #69: Maiden, Mother, Crone",
  "Pathfinder #71: Rasputin Must Die!",
  "Pathfinder #74: Sword of Valor",
  "Pathfinder #77: Herald of the Ivory Labyrinth",
  "Pathfinder #78: City of Locusts",
  "Pathfinder #80: Empty Graves",
  "Pathfinder #81: Shifting Sands",
  "Pathfinder #82: Secrets of the Sphinx",
  "Pathfinder #84: Pyramid of the Sky Pharaoh",
  "Pathfinder #86: Lords of Rust",
  "Pathfinder #89: Palace of Fallen Stars",
  "Pathfinder #91: Battle of Bloodmarch Hills",
  "Pathfinder #93: Forge of the Giant God",
  "Pathfinder #95: Anvil of Fire",
  "Pathfinder Campaign Setting",
  "Pathfinder Comics #10",
  "Pathfinder Society Field Guide",
  "Pathfinder Society Primer",
  "Paths of the Righteous",
  "People of the River",
  "People of the Sands",
  "People of the Stars",
  "People of the Wastes",
  "Pirates of the Inner Sea",
  "Planar Adventures",
  "Plane-Hopper's Handbook",
  "Planes of Power",
  "Potions and Poisons",
  "Psychic Anthology",
  "Qadira, Jewel of the East",
  "Quests and Campaigns",
  "Ranged Tactics Toolbox",
  "Rise of the Runelords Anniversary Edition",
  "Rival Guide",
  "Sargava, the Lost Colony",
  "Second Darkness Player's Guide",
  "Seekers of Secrets",
  "Spymaster's Handbook",
  "Taldor, Echoes of Glory",
  "Technology Guide",
  "The Dragon's Demand",
  "The First World, Realm of the Fey",
  "The Harrow Handbook",
  "Ultimate Wilderness",
  "Undead Slayer's Handbook",
  "Villain Codex",
  "Wilderness Origins"
]

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
