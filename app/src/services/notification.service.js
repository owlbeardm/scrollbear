angular.module('app.services').factory('notificationService', [
  '$rootScope',
  '$log',
  ($rootScope, $log) => {
    const NotificationService = {};
    NotificationService.FILTER_CHANGED = 'Filter:Changed';
    NotificationService.FILTER_ONLY_CLASS_SPELLS_CHANGED = 'FilterOnlyClass:Changed';

    NotificationService.subscribe = (scope, eventName, callback) => {
      const handler = $rootScope.$on(eventName, callback);
      scope.$on('$destroy', handler);
    };

    NotificationService.notify = (eventName, param) => {
      $log.debug('NotificationService.notify', eventName, param);
      $rootScope.$emit(eventName, param);
    };
    return NotificationService;
  },
]);
