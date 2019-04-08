"use strict";

function YesNoModalController($log) {
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug('YesNoModalController init');
    ctrl.levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  ctrl.yesAction = function() {
    ctrl.modalInstance.close();
  };

  ctrl.noAction = function() {
    ctrl.modalInstance.dismiss();
  };

}

const YesNoModalComponent = {
  template: require('./yes-no-modal.html'),
  controller: ['$log', YesNoModalController],
  bindings: {
    modalInstance: "<",
    resolve: "<",
  }
}

export default YesNoModalComponent;
