"use strict";

function SpellListLightController($log, $state, $scope, $rootScope, $timeout, filterService, spellService, $window, $document) {
  $log.debug('SpellListLightController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellListLightController init");
    angular.element($window).bind('scroll', function() {
      ctrl.redraw();
    })
    angular.element($window).bind('resize', function() {
      ctrl.redraw();
    });

  }

  ctrl.$onChanges = function(ch) {
    ctrl.elementHeight = ctrl.spells.length * 43;
    ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
  }

  ctrl.$doCheck = function() {
    ctrl.collapse = angular.element('#' + ctrl.collapseName);
    if (ctrl.collapse.attr('class')) {
      ctrl.classes = ctrl.collapse.attr('class').split(" ");
      ctrl.scroll = $document.scrollTop();
      ctrl.offsetTop = angular.element('#list-new-' + ctrl.collapseName).offset();
      if (ctrl.offsetTop && ctrl.scroll > ctrl.offsetTop.top + ctrl.spells.length * 43) {
        return;
      }
      ctrl.elementHeight = ctrl.spells.length * 43;
      ctrl.height = $window.innerHeight;
      if (ctrl.offsetTop) {
        if (ctrl.scroll > ctrl.offsetTop.top + ctrl.spells * 43) {
          return;
        }
        const elements = ctrl.height / 43 + 2;
        const start = Math.min(Math.max(0, Math.floor((ctrl.scroll - ctrl.offsetTop.top) / 43)), ctrl.spells.length);
        if (elements != ctrl.elements || start != ctrl.start) {
          ctrl.start = start;
          ctrl.elements = elements;
          ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + ctrl.elements);
        }
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

const SpellListLightComponent = {
  template: require('./spell-list-light.html'),
  controller: ['$log', '$state', '$scope', '$rootScope', '$timeout', 'filterService', 'spellService', '$window', '$document', SpellListLightController],
  bindings: {
    spells: '<',
    collapseName: '<'
  }
}

export default SpellListLightComponent;
