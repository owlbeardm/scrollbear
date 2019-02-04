"use strict";

angular.module('app.filters').filter('array', [
  '$log',
  function($log) {
    return function(input) {
      if (!input) {
        return '';
      }
      if (!Array.isArray(input)) {
        return input;
      }
      return input.reduce((accumulator, currentValue, currentIndex) => {
        return accumulator + (
          (currentIndex == 0) ?
          '' :
          ', ') + currentValue;
      }, '');
    };
  }
]);
