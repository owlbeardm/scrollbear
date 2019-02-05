"use strict";

const mainComponents = angular.module('main.components', []);

import PageHeaderComponent from './pageheader.component.js';
mainComponents.component('pageheader', PageHeaderComponent);

import PageFooterComponent from './pagefooter.component.js';
mainComponents.component('pagefooter', PageFooterComponent);

import FilterComponent from './filter.component.js';
mainComponents.component('filter', FilterComponent);

import MainComponent from './main.component.js';
mainComponents.component('main', MainComponent);
