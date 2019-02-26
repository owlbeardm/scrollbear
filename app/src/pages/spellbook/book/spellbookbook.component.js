"use strict";

function SpellbookBookController($log, $state, $scope, notificationService, filterService, spellService, spellbookService, CLASSES) {
  $log.debug('SpellController create');
  const ctrl = this;
  const SELECTED_CLASS = "SELECTED_CLASS";

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    if (spellbookService.selectedCharacter) {
      ctrl.book = spellbookService.selectedCharacter.book;
      Object.entries(ctrl.book).forEach(function(pair) {
        pair[1].sort();
        const unique = [];
        ctrl.book[pair[0]] = pair[1].filter((spell) => {
          const result = !unique.includes(spell);
          unique.push(spell);
          return result;
        });
      });
    }
    spellbookService.saveCharacters();
    calculateTotal();
  }

  ctrl.chooseSpell = function(spell) {
    const spell_url = spellService.spellNameToUrl(spell);
    $state.go('spells', {spellUrl: spell_url});
  }

  ctrl.delete = function(key, id) {
    $log.debug("SpellbookBookController ctrl.delete", key, id);
    spellbookService.selectedCharacter.book[key].splice(id, 1);
    spellbookService.saveCharacters();
    calculateTotal();
  }

  function calculateTotal() {
    ctrl.total = Object.entries(ctrl.book).reduce(function(total, pair) {
      return total + (pair[1].length);
    }, 0);
  }

}

const SpellbookBookComponent = {
  template: require('./spellbookbook.html'),
  controller: [
    '$log',
    '$state',
    '$scope',
    'notificationService',
    'filterService',
    'spellService',
    'spellbookService',
    'CLASSES',
    SpellbookBookController
  ],
  bindings: {
    spells: '<',
    className: '<'
  }
}

export default SpellbookBookComponent;
