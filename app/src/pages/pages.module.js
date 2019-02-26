"use strict";
const pagesComponents = angular.module('pages.components', []);

import SpellbookComponent from './spellbook/spellbook.component.js';
pagesComponents.component('spellbook', SpellbookComponent);

import CharactersComponent from './spellbook/characters/characters.component.js';
pagesComponents.component('characters', CharactersComponent);
import NewCharacterComponent from './spellbook/characters/newcharacter.component.js';
pagesComponents.component('newcharacter', NewCharacterComponent);

import PreparedComponent from './spellbook/prepared/prepared.component.js';
pagesComponents.component('prepared', PreparedComponent);

import SpellbookSpellListComponent from './spellbook/list/spellbookspelllist.component.js';
pagesComponents.component('spellbookSpelllist', SpellbookSpellListComponent);

import SpellbookBookComponent from './spellbook/book/spellbookbook.component.js';
pagesComponents.component('spellbookBook', SpellbookBookComponent);

import MainComponent from './main/main.component.js';
pagesComponents.component('main', MainComponent);

import SpellComponent from './spells/spell.component.js';
pagesComponents.component('spell', SpellComponent);
