"use strict";

const appComponents = angular.module('app.components', []);

import PCComponent from './pc.component.js';
import AddPCComponent from './addpc.component.js';
import PageHeaderComponent from './pageheader.component.js';
import ConditionComponent from './condition.component.js';

appComponents.component('pc', PCComponent);
appComponents.component('addpc', AddPCComponent);
appComponents.component('pageheader', PageHeaderComponent);
appComponents.component('condition', ConditionComponent);
