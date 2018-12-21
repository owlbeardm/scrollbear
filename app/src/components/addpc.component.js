"use strict";

function AddPCController($log, focusService) {
  $log.debug('PageHeaderController create');
  const ctrl = this;

  ctrl.add = function() {
    const pc = {
      name: ctrl.name,
      hp: ctrl.hp,
      dex: ctrl.dex,
      initiative: undefined,
      actions: [false, false, false, false]
    }
    ctrl.pcs.push(pc);
    ctrl.name = undefined;
    ctrl.hp = undefined;
    ctrl.dex = undefined;
    focusService.setFocus('pcName');
  }

  ctrl.clearAll = function() {
    ctrl.clear();
  }

}

const AddPCComponent = {
  template: require('./addpc.html'),
  controller: [
    '$log', 'focusService', AddPCController
  ],
  bindings: {
    pcs: '<',
    clear: '&'
  }
}

export default AddPCComponent;
