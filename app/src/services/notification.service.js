"use strict";

angular.module('app.services').factory('notificationService', [
  '$rootScope',
  '$log',
  function($rootScope, $log) {
    const NotificationService = {};
    NotificationService.FILTER_CHANGED = 'Filter:Changed';
    NotificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED = 'FilterOnlyClass:Changed';

    NotificationService.subscribe = function(scope, eventName, callback) {
      const handler = $rootScope.$on(eventName, callback);
      scope.$on('$destroy', handler);
    }

    NotificationService.notify = function(eventName, param) {
      $log.debug("NotificationService.notify", eventName, param);
      $rootScope.$emit(eventName, param);
    }
    return NotificationService;
  }
]);
