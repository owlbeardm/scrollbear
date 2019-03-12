"use strict";

const appComponents = angular.module('app.components', []);

import CharacterItem from './character-item/character-item.component.js';
appComponents.component('characterItem', CharacterItem);

import KnownSpelLevel from './known-spell-level/known-spell-level.component.js';
appComponents.component('knownSpellLevel', KnownSpelLevel);

import ModalSpell from './modal-spell/modal-spell.component.js';
appComponents.component('modalSpell', ModalSpell);

import PreparedSpelLevel from './prepared-spell-level/prepared-spell-level.component.js';
appComponents.component('preparedSpellLevel', PreparedSpelLevel);

import SpellListComponent from './spell-list/spell-list.component.js';
appComponents.component('spellList', SpellListComponent);

import PageHeaderComponent from './page-header/page-header.component.js';
appComponents.component('pageHeader', PageHeaderComponent);

import PageFooterComponent from './page-footer/page-footer.component.js';
appComponents.component('pageFooter', PageFooterComponent);

import FilterComponent from './filter/filter.component.js';
appComponents.component('filter', FilterComponent);
