"use strict";

const spelllistComponents = angular.module('spelllist.components', []);

import SpellComponent from './spell.component.js';
spelllistComponents.component('spell', SpellComponent);

import SpellListComponent from './spelllist.component.js';
spelllistComponents.component('spelllist', SpellListComponent);
