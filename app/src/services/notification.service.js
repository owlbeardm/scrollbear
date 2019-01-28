"use strict";

angular.module('dApp.services').factory('notificationService', [
  '$rootScope',
  '$log',
  function($rootScope, $log) {
    const NotificationService = {};

    NotificationService.subscribe = function(scope, eventName, callback) {
      const handler = $rootScope.$on(eventName, callback);
      scope.$on('$destroy', handler);
    }

    NotificationService.notify = function(eventName, param) {
      $log.debug("NotificationService.notify", eventName, param);
      $rootScope.$emit(eventName, param);
    }

    // notificationService.subscribe($scope, "EVENTNAME", (event, param) => {
    //   ctrl.messages.push(param);
    //   $timeout(function() {
    //     $log.debug('Remove');
    //     ctrl.messages.splice(0, 1);
    //   }, 5000);
    // });

    // notificationService.notify("EVENTNAME", param);

    return NotificationService;
  }
]);
