"use strict";

const appComponents = angular.module('app.components', []);

import SpellComponent from './spell.component.js';
appComponents.component('spell', SpellComponent);

import PageHeaderComponent from './pageheader.component.js';
appComponents.component('pageheader', PageHeaderComponent);

import MainComponent from './main.component.js';
appComponents.component('main', MainComponent);
