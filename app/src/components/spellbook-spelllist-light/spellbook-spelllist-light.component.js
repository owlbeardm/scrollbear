"use strict";

function SpellbookSpelllistLightController($log, $state, $scope, $rootScope, $timeout, filterService, spellService, $window, $document) {
  $log.debug('SpellbookSpelllistLightController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellbookSpelllistLightController init");
    angular.element($window).bind('scroll', function() {
      ctrl.redraw();
    })
    angular.element($window).bind('resize', function() {
      ctrl.redraw();
    });
    $log.debug(angular.element('#' + ctrl.collapseName));
  }

  ctrl.$doCheck = function() {
    ctrl.collapse = angular.element('#' + ctrl.collapseName);
    if (ctrl.collapse.attr('class')) {
      ctrl.classes = ctrl.collapse.attr('class').split(" ");
      ctrl.scroll = $document.scrollTop();
      ctrl.offsetTop = angular.element('#list-new-' + ctrl.collapseName).offset();
      if (ctrl.offsetTop && ctrl.scroll > ctrl.offsetTop.top + ctrl.spells.length * 40) {
        return;
      }
      ctrl.elementHeight = ctrl.spells.length * 40;
      ctrl.height = $window.innerHeight;
      if (ctrl.offsetTop) {
        if (ctrl.scroll > ctrl.offsetTop.top + ctrl.spells * 40) {
          return;
        }
        const elements = ctrl.height / 40 + 2;
        ctrl.start = Math.min(Math.max(0, Math.floor((ctrl.scroll - ctrl.offsetTop.top) / 40)), ctrl.spells.length);
        ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + elements);
      }
    }
  }

  ctrl.redraw = function() {
    ctrl.$doCheck();
    $scope.$digest();
  }

  ctrl.chooseSpell = function(spell) {
    spellService.showSpell(spell.name);
  }

  ctrl.isFav = function(spell) {
    return filterService.isFav(spell);
  }

  ctrl.changeFav = function(spell) {
    filterService.changeFav(spell);
  }

}

const SpellbookSpelllistLightComponent = {
  template: require('./spellbook-spelllist-light.html'),
  controller: ['$log', '$state', '$scope', '$rootScope', '$timeout', 'filterService', 'spellService', '$window', '$document', SpellbookSpelllistLightController],
  bindings: {
    spells: '<',
    collapseName: '<'
  }
}

export default SpellbookSpelllistLightComponent;
