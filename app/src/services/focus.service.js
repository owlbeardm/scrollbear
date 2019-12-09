
angular.module('app.services').factory('focusService', [
  '$log',
  '$timeout',
  '$window',
  ($log, $timeout, $window) => {
    const FocusService = {};

    FocusService.setFocus = (id) => {
      $timeout(() => {
        const element = $window.document.getElementById(id);
        if (element) {
          element.focus();
        }
      });
    };

    return FocusService;
  },
]);
