"use strict";

const appConstants = angular.module('app.constants', []);

appConstants.constant('CLASSES', {
  'all': {
    name: 'All'
  },
  'alchemist': {
    name: 'Alchemist',
    search: ['alchemist']
  },
  'antipaladin': {
    name: 'Antipaladin',
    search: ['antipaladin']
  },
  'arcanist': {
    name: 'Arcanist',
    search: ['arcanist', 'wizard', 'sorcerer']
  },
  'bard': {
    name: 'Bard',
    search: ['bard']
  },
  'bloodrager': {
    name: 'Bloodrager',
    search: ['bloodrager']
  },
  'cleric': {
    name: 'Cleric',
    search: ['cleric']
  },
  'druid': {
    name: 'Druid',
    search: ['druid']
  },
  'hunter': {
    name: 'Hunter',
    search: ['hunter', 'druid', 'ranger']
  },
  'inquisitor': {
    name: 'Inquisitor',
    search: ['inquisitor']
  },
  'investigator': {
    name: 'Investigator',
    search: ['investigator', 'alchemist']
  },
  'magus': {
    name: 'Magus',
    search: ['magus']
  },
  'medium': {
    name: 'Medium',
    search: ['medium']
  },
  'mesmerist': {
    name: 'Mesmerist',
    search: ['mesmerist']
  },
  'occultist': {
    name: 'Occultist',
    search: ['occultist']
  },
  'oracle': {
    name: 'Oracle',
    search: ['oracle', 'cleric']
  },
  'paladin': {
    name: 'Paladin',
    search: [/^paladin/gi]
  },
  'psychic': {
    name: 'Psychic',
    search: ['psychic']
  },
  'ranger': {
    name: 'Ranger',
    search: ['ranger']
  },
  'shaman': {
    name: 'Shaman',
    search: ['shaman']
  },
  'skald': {
    name: 'Skald',
    search: ['bard', 'skald']
  },
  'sorcerer': {
    name: 'Sorcerer',
    search: ['sorcerer']
  },
  'spiritualist': {
    name: 'Spiritualist',
    search: ['spiritualist']
  },
  'summoner': {
    name: 'Summoner',
    search: [/^summoner/gi]
  },
  'summoner (unchained)': {
    name: 'Summoner Unchained',
    search: [/summoner \(unchained\)/gi]
  },
  'warpriest': {
    name: 'Warpriest',
    search: ['warpriest', 'cleric']
  },
  'witch': {
    name: 'Witch',
    search: ['witch']
  },
  'wizard': {
    name: 'Wizard',
    search: ['wizard', 'sorcerer']
  }
});

appConstants.constant('SCHOOLS', {
  "any": {
    name: 'Any school',
    search: (spell) => {
      return true;
    }
  },
  "abjuration": {
    name: 'Abjuration',
    search: ['abjuration']
  },
  "conjuration": {
    name: 'Conjuration',
    subschool: ['any', 'calling', 'creation', 'healing', 'summoning', 'teleportation'],
    search: ['conjuration']
  },
  "divination": {
    name: 'Divination',
    subschool: ['any', 'scrying'],
    search: ['divination']
  },
  "enchantment": {
    name: 'Enchantment',
    subschool: ['any', 'charm', 'compulsion'],
    search: ['enchantment']
  },
  "evocation": {
    name: 'Evocation',
    search: ['evocation']
  },
  "illusion": {
    name: 'Illusion',
    subschool: ['any', 'figment', 'glamer', 'pattern', 'phantasm', 'shadow'],
    search: ['illusion']
  },
  "necromancy": {
    name: 'Necromancy',
    search: ['necromancy']
  },
  "transmutation": {
    name: 'Transmutation',
    subschool: ['any', 'polymorph'],
    search: ['transmutation']
  },
  "other": {
    name: 'Other shools',
    search: (spell) => {
      return !['transmutation', 'conjuration', 'evocation', 'enchantment', 'abjuration', 'necromancy', 'divination', 'illusion'].includes(spell.school)
    }
  }
});

appConstants.constant('SUBSCHOOLS', {
  "any": {
    name: 'Any subschool',
    search: (spell) => {
      return true;
    }
  },
  "calling": {
    name: 'Calling',
    search: ['calling']
  },
  "charm": {
    name: 'Charm',
    search: ['charm']
  },
  "compulsion": {
    name: 'Compulsion',
    search: ['compulsion']
  },
  "creation": {
    name: 'Creation',
    search: ['creation']
  },
  "figment": {
    name: 'Figment',
    search: ['figment']
  },
  "glamer": {
    name: 'Glamer',
    search: ['glamer']
  },
  "healing": {
    name: 'Healing',
    search: ['healing']
  },
  "pattern": {
    name: 'Pattern',
    search: ['pattern']
  },
  "phantasm": {
    name: 'Phantasm',
    search: ['phantasm']
  },
  "polymorph": {
    name: 'Polymorph',
    search: ['polymorph']
  },
  "scrying": {
    name: 'Scrying',
    search: ['scrying']
  },
  "shadow": {
    name: 'Shadow',
    search: ['shadow']
  },
  "summoning": {
    name: 'Summoning',
    search: ['summoning']
  },
  "teleportation": {
    name: 'Teleportation',
    search: ['teleportation']
  }
});

appConstants.constant('CASTING_TIME', {
  "any": {
    name: 'Any casting time',
    search: (spell) => {
      return true;
    }
  },
  "1 standard action": {
    name: '1 standard action',
    search: ['1 standard action']
  },
  "1 immediate action": {
    name: '1 immediate action',
    search: ['1 immediate action']
  },
  "1 swift action": {
    name: '1 swift action',
    search: ['1 swift action']
  },
  "1 full-round action": {
    name: '1 full-round action',
    search: ['1 full-round action', '1 full-round action, special see below']
  },
  "1 round": {
    name: '1 round',
    search: ['1 round', '1 full round']
  },
  "3 rounds": {
    name: '3 rounds',
    search: ['3 rounds']
  },
  "10 minutes": {
    name: '10 minutes',
    search: ['10 minutes', '10 minutes see text', '10 minutes (see text)']
  },
  "30 minutes": {
    name: '30 minutes',
    search: ['30 minutes']
  },
  "1 hour": {
    name: '1 hour',
    search: ['1 hour']
  },
  "8 hours": {
    name: '8 hours',
    search: ['8 hours']
  },
  "24 hours": {
    name: '24 hours',
    search: ['24 hours']
  },
  "other": {
    name: 'Other casting time',
    search: (spell) => {
      return !['1 standard action', '1 immediate action', '1 swift action', '1 full-round action', '1 round', '1 full round', '3 rounds', '10 minutes', '30 minutes', '1 hour', '8 hours', '24 hours'].includes(spell.school)
    }
  }
});

appConstants.constant('SOURCE_BOOK', [
  "PRPG Core Rulebook",
  "Advanced Player's Guide",
  "Ultimate Magic",
  "Ultimate Combat",
  "Occult Adventures",
  "Advanced Class Guide",
  "Ultimate Intrigue",
  "Advanced Race Guide",
  "Horror Adventures",
  "Inner Sea Gods",
  "Ultimate Wilderness",
  "Adventurer's Guide",
  "Arcane Anthology",
  "Inner Sea Magic",
  "Inner Sea Races",
  "Magic Tactics Toolbox",
  "Villain Codex",
  "Inner Sea Intrigue",
  "Monster Codex",
  "Black Markets",
  "Blood of Shadows",
  "Planar Adventures",
  "Inner Sea Temples",
  "Occult Origins",
  "Dirty Tactics Toolbox",
  "Psychic Anthology",
  "Technology Guide",
  "Dwarves of Golarion",
  "Aquatic Adventures",
  "Blood of the Beast",
  "Heroes of the Darklands",
  "Legacy of Dragons",
  "Legacy of the First World",
  "Pathfinder Society Field Guide",
  "Agents of Evil",
  "Book of the Damned",
  "Heroes of the Streets",
  "Book of the Damned - Volume 3: Horsemen of the Apocalypse",
  "Elemental Master's Handbook",
  "Plane-Hopper's Handbook",
  "Champions of Purity",
  "Disciple's Doctrine",
  "Pathfinder Campaign Setting",
  "Spymaster's Handbook",
  "Advanced Class Origins",
  "Divine Anthology",
  "Haunted Heroes Handbook",
  "Melee Tactics Toolbox",
  "Mythic Adventures",
  "People of the Wastes",
  "Quests and Campaigns",
  "Blood of the Ancients",
  "Dragonslayer's Handbook",
  "Faction Guide",
  "Giant Hunter's Handbook",
  "Inner Sea World Guide",
  "Knights of the Inner Sea",
  "Kobolds of Golarion",
  "Monster Hunter's Handbook",
  "Pathfinder #74: Sword of Valor",
  "Potions and Poisons",
  "Undead Slayer's Handbook",
  "Healer's Handbook",
  "Heroes of the High Court",
  "Heroes of the Wild",
  "Monster Summoner's Handbook",
  "Occult Mysteries",
  "Pathfinder #91: Battle of Bloodmarch Hills",
  "People of the River",
  "People of the Stars",
  "Rise of the Runelords Anniversary Edition",
  "Rival Guide",
  "Taldor, Echoes of Glory",
  "Adventurer's Armory 2",
  "Animal Archive",
  "Blood of the Night",
  "Chronicle of the Righteous",
  "Demon Hunter's Handbook",
  "Dungeoneer's Handbook",
  "Faiths and Philosophies",
  "Paizo Blog - Ultimate Cantrips",
  "Pathfinder Society Primer",
  "Ranged Tactics Toolbox",
  "Wilderness Origins",
  "Blood of the Coven",
  "Cheliax, Empire of Devils",
  "Familiar Folio",
  "Heroes from the Fringe",
  "Humans of Golarion",
  "Mythic Origins",
  "Pathfinder #24: The Final Wish",
  "People of the Sands",
  "Pirates of the Inner Sea",
  "Armor Master's Handbook",
  "Blood of the Sea",
  "Dark Markets - A Guide to Katapesh",
  "Inner Sea Monster Codex",
  "Pathfinder #119: Prisoners of the Blight",
  "Pathfinder Comics #10",
  "Seekers of Secrets",
  "The First World, Realm of the Fey",
  "Blood of the Moon",
  "Cohorts and Companions",
  "Goblins of Golarion",
  "Magical Marketplace",
  "Orcs of Golarion",
  "Pathfinder #131: The Reaper's Right Hand",
  "Pathfinder #29: Mother of Flies",
  "Pathfinder #67: The Snows of Summer",
  "Pathfinder #82: Secrets of the Sphinx",
  "Sargava, the Lost Colony",
  "Champions of Balance",
  "Champions of Corruption",
  "Classic Treasures Revisited",
  "Curse of the Crimson Throne (PFRPG)",
  "Distant Realms",
  "Dungeons of Golarion",
  "Gods and Magic",
  "Hell's Vengeance Player's Guide",
  "Occult Realms",
  "Pathfinder #113: What Grows Within",
  "Pathfinder #115: Trail of the Hunted",
  "Pathfinder #116: Fangs of War",
  "Pathfinder #117: Assault on Longshadow",
  "Pathfinder #134: It Came from Hollow Mountain",
  "Pathfinder #55: The Wormwood Mutiny",
  "Pathfinder #68: The Shackled Hut",
  "Pathfinder #71: Rasputin Must Die!",
  "Pathfinder #77: Herald of the Ivory Labyrinth",
  "Pathfinder #80: Empty Graves",
  "Pathfinder #81: Shifting Sands",
  "Second Darkness Player's Guide",
  "Blood of the Elements",
  "Conquest of Bloodsworn Vale",
  "Demons Revisited",
  "Dragon Empires Primer",
  "Dungeon Denizens Revisited",
  "Faiths of Corruption",
  "Faiths of Purity",
  "GameMastery Condition Cards",
  "Gnomes of Golarion",
  "Guardians of Dragonfall",
  "Guide to the River Kingdoms",
  "Lands of the Linnorm Kings",
  "Lost Kingdoms",
  "Osirion, Legacy of the Pharaohs",
  "Pathfinder #102: Breaking the Bones of Hell",
  "Pathfinder #107: Scourge of the Godclaw",
  "Pathfinder #110: The Thrushmoor Terror",
  "Pathfinder #14: Children of the Void",
  "Pathfinder #19: Howl of the Carrion King",
  "Pathfinder #30: The Twice-Damned Prince",
  "Pathfinder #35: War of the River Kings",
  "Pathfinder #42: Sanctum of the Serpent God",
  "Pathfinder #56: Raiders of the Fever Sea",
  "Pathfinder #62: Curse of the Lady's Light",
  "Pathfinder #64: Beyond the Doomsday Door",
  "Pathfinder #65: Into the Nightmare Rift",
  "Pathfinder #69: Maiden, Mother, Crone",
  "Pathfinder #78: City of Locusts",
  "Pathfinder #84: Pyramid of the Sky Pharaoh",
  "Pathfinder #86: Lords of Rust",
  "Pathfinder #89: Palace of Fallen Stars",
  "Pathfinder #93: Forge of the Giant God",
  "Pathfinder #95: Anvil of Fire",
  "Paths of the Righteous",
  "Planes of Power",
  "Qadira, Jewel of the East",
  "The Dragon's Demand",
  "The Harrow Handbook"
]);
