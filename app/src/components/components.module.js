"use strict";

import './spelllist/spelllist.module.js';
import './main/main.module.js';

const appComponents = angular.module('app.components', ['spelllist.components', 'main.components']);

import KnownSpelLevel from './known-spell-level/known-spell-level.component.js';
appComponents.component('knownSpellLevel', KnownSpelLevel);

import PreparedSpelLevel from './prepared-spell-level/prepared-spell-level.component.js';
appComponents.component('preparedSpellLevel', PreparedSpelLevel);

import CharacterItem from './character-item/character-item.component.js';
appComponents.component('characterItem', CharacterItem);

import ModalSpell from './modal-spell/modal-spell.component.js';
appComponents.component('modalSpell', ModalSpell);
