"use strict";

const spellbookComponents = angular.module('spellbook.components', []);

import SpellbookComponent from './spellbook.component.js';
spellbookComponents.component('spellbook', SpellbookComponent);

import CharactersComponent from './characters.component.js';
spellbookComponents.component('characters', CharactersComponent);
import NewCharacterComponent from './newcharacter.component.js';
spellbookComponents.component('newcharacter', NewCharacterComponent);

import PreparedComponent from './prepared.component.js';
spellbookComponents.component('prepared', PreparedComponent);

import SpellbookSpellListComponent from './spellbookspelllist.component.js';
spellbookComponents.component('spellbookSpelllist', SpellbookSpellListComponent);

import SpellbookBookComponent from './spellbookbook.component.js';
spellbookComponents.component('spellbookBook', SpellbookBookComponent);
