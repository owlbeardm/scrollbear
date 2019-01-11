"use strict";

const appConstants = angular.module('app.constants', []);

appConstants.constant('CLASSES', {
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
