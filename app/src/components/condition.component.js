"use strict";

function ConditionController($log) {
  $log.debug('ConditionController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug('ConditionController init ');
    ctrl.showDelete = false;
  }

  ctrl.deleteThis = function() {
    $log.debug('ConditionController deleteThis ');
    ctrl.delete();
  }

  ctrl.changeShowDelete = function() {
    ctrl.showDelete = !ctrl.showDelete;
  }

}

const ConditionComponent = {
  template: require('./condition.html'),
  controller: [
    '$log', ConditionController
  ],
  bindings: {
    condition: '<',
    delete: '&'
  }
}

export default ConditionComponent;
