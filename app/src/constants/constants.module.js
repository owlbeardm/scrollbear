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
    search: ['paladin']
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
    search: ['summoner']
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
    name: 'Any',
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
    search: ['conjuration']
  },
  "divination": {
    name: 'Divination',
    search: ['divination']
  },
  "enchantment": {
    name: 'Enchantment',
    search: ['enchantment']
  },
  "evocation": {
    name: 'Evocation',
    search: ['evocation']
  },
  "illusion": {
    name: 'Illusion',
    search: ['illusion']
  },
  "necromancy": {
    name: 'Necromancy',
    search: ['necromancy']
  },
  "transmutation": {
    name: 'Transmutation',
    search: ['transmutation']
  },
  "other": {
    name: 'Other',
    search: (spell) => {
      return !['transmutation', 'conjuration', 'evocation', 'enchantment', 'abjuration', 'necromancy', 'divination', 'illusion'].includes(spell.school)
    }
  }
});
