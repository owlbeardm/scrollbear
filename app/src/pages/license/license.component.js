"use strict";

const license = require('./license.md');

function LicenseController($log) {
  $log.debug('LicenseController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("LicenseController init");
    ctrl.legal = `<div>${license}</div>`;
  }
}

const LicenseComponent = {
  template: require('./license.html'),
  controller: [
    '$log',
    LicenseController
  ]
}

export default LicenseComponent;
