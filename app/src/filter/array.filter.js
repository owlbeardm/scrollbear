"use strict";

angular.module('app.filters').filter('array', [
  '$log',
  function($log) {
    return function(input) {
      if (!input || !input.length) {
        return input;
      }
      $log.debug('app.filters', input);
      return input.reduce((accumulator, currentValue, currentIndex) => {
        return accumulator + (
          (currentIndex == 0)
          ? ''
          : ', ') + currentValue;
      }, '');
    };
  }
]);
