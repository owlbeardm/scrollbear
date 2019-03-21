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

appConstants.constant('CASTING_TIME', {
  "any": {
    name: 'Any',
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
    name: 'Other',
    search: (spell) => {
      return !['1 standard action', '1 immediate action', '1 swift action', '1 full-round action', '1 round', '1 full round', '3 rounds', '10 minutes', '30 minutes', '1 hour', '8 hours', '24 hours'].includes(spell.school)
    }
  }
});
