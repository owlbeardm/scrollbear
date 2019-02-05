"use strict";

angular.module('app.services').factory('spellbookService', [
  '$log',
  '$window',
  function($log, $window) {
    const SpellbookService = {};
    SpellbookService.characters = [];

    SpellbookService.characterSelected = function() {
      return 1;
    }

    return SpellbookService;
  }
]);
