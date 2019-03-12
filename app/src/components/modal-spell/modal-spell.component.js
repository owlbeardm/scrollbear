"use strict";

function ModalSpellController($log, $rootScope, $location, spellService, filterService) {
  $log.debug('ModalSpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    const popup = angular.element("#modalSpell");

    popup.on("show.bs.modal", function() {
      $log.debug('ModalSpellController show.bs.modal');
      $rootScope.title = `${$rootScope.spell.name} - `;
      // ctrl.prevUrl = $location.url();
      // $location.url(`spells/${spellService.spellNameToUrl($rootScope.spell.name)}`);
      // $location.replace();
    });
    popup.on("hidden.bs.modal", function() {
      $log.debug('ModalSpellController hidden.bs.modal', JSON.stringify($location.url()));
      $rootScope.title = ``;
    });
  }

  ctrl.isFav = function(spell) {
    return filterService.isFav($rootScope.spell);
  }

  ctrl.changeFav = function(spell) {
    filterService.changeFav($rootScope.spell);
  }
}

const ModalSpellComponent = {
  template: require('./modal-spell.html'),
  controller: [
    '$log', '$rootScope', '$location', 'spellService', 'filterService', ModalSpellController
  ]
}

export default ModalSpellComponent;