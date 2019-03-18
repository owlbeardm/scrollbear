"use strict";

function SpellListLightController($log, $state, $scope, $timeout, filterService, spellService, $window, $document) {
  $log.debug('SpellController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("SpellListLightController init");
    ctrl.redraw();
    angular.element($window).bind('scroll', function() {
      ctrl.redraw();
    })
    angular.element($window).bind('resize', function() {
      ctrl.redraw();
    });
  }

  ctrl.redraw = function() {
    ctrl.collapse = angular.element($document.find('#collapse0'));
    if (ctrl.collapse.attr('class')) {
      ctrl.classes = ctrl.collapse.attr('class').split(" ");
      if(!ctrl.classes.includes('show') &&  ctrl.classes.includes('collapsing')){
        ctrl.spellsL = [];
        ctrl.elementHeight = 0;
        return;
      }
    }
    ctrl.scroll = $document.scrollTop();
    ctrl.offsetTop = angular.element($document.find('#list-new-'+ctrl.collapseName)).offset();
    if (ctrl.offsetTop && ctrl.scroll > ctrl.offsetTop.top + ctrl.spells.length * 52) {
      return;
    }
    ctrl.elementHeight = ctrl.spells.length*52;
    ctrl.height = $window.innerHeight;
    if (ctrl.offsetTop) {
      if (ctrl.scroll > ctrl.offsetTop.top + ctrl.spells * 52) {
        return;
      }
      const elements = ctrl.height / 52  + 1;
      ctrl.start = Math.min(Math.max(0, Math.floor((ctrl.scroll - ctrl.offsetTop.top) / 52)), ctrl.spells.length);
      ctrl.spellsL = ctrl.spells.slice(ctrl.start, ctrl.start + elements);
      $scope.$digest();
    }
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
  controller: ['$log', '$state', '$scope', '$timeout', 'filterService', 'spellService', '$window', '$document', SpellListLightController],
  bindings: {
    spells: '<',
    collapseName: '<'
  }
}

export default SpellListLightComponent;
