"use strict";

const appComponents = angular.module('app.components', []);

import SpellComponent from './spelllist/spell.component.js';
appComponents.component('spell', SpellComponent);

import SpellListComponent from './spelllist/spelllist.component.js';
appComponents.component('spelllist', SpellListComponent);

import PageHeaderComponent from './main/pageheader.component.js';
appComponents.component('pageheader', PageHeaderComponent);

import PageFooterComponent from './main/pagefooter.component.js';
appComponents.component('pagefooter', PageFooterComponent);

import FilterComponent from './main/filter.component.js';
appComponents.component('filter', FilterComponent);

import MainComponent from './main/main.component.js';
appComponents.component('main', MainComponent);
