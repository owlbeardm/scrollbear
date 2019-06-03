"use strict";

import './modal-metamagic.css';

function ModalMetamagicController($log, $rootScope, $location, spellService, filterService, $timeout, METAMAGIC) {
  $log.debug('ModalMetamagicController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    ctrl.castingTimes = METAMAGIC;
    ctrl.levelIncreases = {
      0: {
        name: "+0"
      },
      1: {
        name: "+1"
      },
      2: {
        name: "+2"
      },
      3: {
        name: "+3"
      },
      4: {
        name: "+4"
      },
      5: {
        name: "+5"
      },
      6: {
        name: "+6"
      },
      7: {
        name: "+7"
      },
      8: {
        name: "+8"
      },
      9: {
        name: "+9"
      }
    }
    ctrl.spellName = 'Phantasmal Web';
    ctrl.labels = [];
    ctrl.initialLevel = 1;
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
    return ctrl.labels.filter(x => !!x);
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
