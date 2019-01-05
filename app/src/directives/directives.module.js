"use strict";

const appDirectives = angular.module('app.directives', []);

import EventFocusDirective from './eventfocus.directive.js';

appDirectives.directive('eventFocus', EventFocusDirective);
