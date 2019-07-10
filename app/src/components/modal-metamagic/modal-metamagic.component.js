"use strict";

import './modal-metamagic.css';

function ModalMetamagicController($log, $rootScope, $location, spellService, filterService, $timeout, METAMAGIC) {
  $log.debug('ModalMetamagicController create');
  const ctrl = this;
  const LevelIncreases = ["+0", "+1", "+2", "+3", "+4", "+5", "+6", "+7", "+8", "+9"];

  ctrl.$onInit = function() {
      $log.debug('ModalMetamagicController ctrl.levelIncreases', ctrl.levelIncreases)
    ctrl.castingTimes = METAMAGIC;
    ctrl.spellName = 'Phantasmal Web';
    ctrl.labels = [];
    ctrl.initialLevel = 5;
    ctrl.levelIncreases = LevelIncreases.slice(0,10-ctrl.initialLevel);
    ctrl.levelSelected = 0;
    ctrl.finalLevel;
  }

  ctrl.addLabel = function() {
    ctrl.labels.push(undefined);
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh')
    });
  }

  ctrl.delete = function(id) {
    ctrl.labels.splice(id, 1);
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh')
    });
  }

  ctrl.filteredLabels = function() {
    return ctrl.labels
      .filter(x => !!x)
      .map(x => x.replace(' spell', ''))
      .sort();
  }

  ctrl.refresh = function() {
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh')
    });
  }

}

const ModalMetamagicComponent = {
  template: require('./modal-metamagic.html'),
  controller: [
    '$log', '$rootScope', '$location', 'spellService', 'filterService', '$timeout', 'METAMAGIC', ModalMetamagicController
  ]
}

export default ModalMetamagicComponent;
