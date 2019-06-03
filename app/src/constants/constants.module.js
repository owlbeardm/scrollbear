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

appConstants.constant('METAMAGIC', [
  "Apocalyptic Spell",
  "Aquatic Spell",
  "Ascendant Spell",
  "Authoritative Spell",
  "Benthic Spell",
  "Blissful Spell",
  "Bouncing Spell",
  "Brackish Spell",
  "Brisk Spell",
  "Burning Spell",
  "Centered Spell",
  "Cherry Blossom Spell",
  "Coaxing Spell",
  "Concussive Spell",
  "Conditional Spell",
  "Consecrate Spell",
  "Contagious Spell",
  "Contingent Spell",
  "Crypt Spell",
  "Dazing Spell",
  "Delayed Spell",
  "Disruptive Spell",
  "Echoing Spell",
  "Eclipsed Spell",
  "Ectoplasmic Spell",
  "Elemental Spell",
  "Empower Spell",
  "Encouraging Spell",
  "Enlarge Spell",
  "Extend Spell",
  "Familiar Spell",
  "Fearsome Spell",
  "Flaring Spell",
  "Fleeting Spell",
  "Focused Spell",
  "Furious Spell",
  "Heighten Spell",
  "Intensified Spell",
  "Intuitive Spell",
  "Jinxed Spell",
  "Latent Curse",
  "Lingering Spell",
  "Logical Spell",
  "Maximize Spell",
  "Merciful Spell",
  "Murky Spell",
  "Persistent Spell",
  "Piercing Spell",
  "Quicken Spell",
  "Reach Spell",
  "Rime Spell",
  "Scarring Spell",
  "Scouting Summons",
  "Seeking Spell",
  "Selective Spell",
  "Shadow Grasp",
  "Sickening Spell",
  "Silent Spell",
  "Snuffing Spell",
  "Solar Spell",
  "Solid Shadows",
  "Stable Spell",
  "Steam Spell",
  "Still Spell",
  "Studied Spell",
  "Stygian Spell",
  "Stylized Spell",
  "Tenacious Spell",
  "Tenebrous Spell",
  "Thanatopic Spell",
  "Threatening Illusion",
  "Threnodic Spell",
  "Thundering Spell",
  "Toppling Spell",
  "Toxic Spell",
  "Traumatic Spell",
  "Trick Spell",
  "Tumultuous Spell",
  "Umbral Spell",
  "Ursurping Spell",
  "Vast Spell",
  "Verdant Spell",
  "Widen Spell",
  "Yai-Mimic Spell"
]);

appConstants.constant('SOURCE_BOOK', [
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
]);
