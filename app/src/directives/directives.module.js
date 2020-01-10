import EventFocusDirective from './eventfocus.directive';

const appDirectives = angular.module('app.directives', []);

appDirectives.directive('eventFocus', EventFocusDirective);
