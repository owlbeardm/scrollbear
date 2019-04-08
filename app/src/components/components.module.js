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

import SpellbookSpelllistLightComponent from './spellbook-spelllist-light/spellbook-spelllist-light.component.js';
appComponents.component('spellbookSpelllistLight', SpellbookSpelllistLightComponent);

import SpellListComponent from './spell-list/spell-list.component.js';
appComponents.component('spellList', SpellListComponent);

import SpellListLightComponent from './spell-list/spell-list-light.component.js';
appComponents.component('spellListLight', SpellListLightComponent);

import PageHeaderComponent from './page-header/page-header.component.js';
appComponents.component('pageHeader', PageHeaderComponent);

import PageFooterComponent from './page-footer/page-footer.component.js';
appComponents.component('pageFooter', PageFooterComponent);

import FilterComponent from './filter/filter.component.js';
appComponents.component('filter', FilterComponent);

import SidebarToggleComponent from './sidebar-toggle/sidebar-toggle.component.js';
appComponents.component('sidebarToggle', SidebarToggleComponent);

import SidebarComponent from './sidebar/sidebar.component.js';
appComponents.component('sidebar', SidebarComponent);

import YesNoModalComponent from './yes-no-modal/yes-no-modal.component.js';
appComponents.component('yesNoModal', YesNoModalComponent);
