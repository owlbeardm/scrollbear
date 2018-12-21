"use strict";

angular.module('app.services').factory('focusService', [
  '$log',
  '$timeout',
  '$window',
  function($log, $timeout, $window) {
    const FocusService = {};

    FocusService.setFocus = function(id) {
      $timeout(function() {
        const element = $window.document.getElementById(id);
        if (element) {
          element.focus();
        }
      });
    };

    return FocusService;
  }
]);
