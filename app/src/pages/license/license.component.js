"use strict";

const license = require('../../../../resources/license.json');
const showdown = require('showdown');

function LicenseController($log, $rootScope, $state) {
  $log.debug('LicenseController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("LicenseController init");

    const converter = new showdown.Converter({
      tables: true,
      strikethrough: true
    });
    ctrl.legal = `<div>${converter.makeHtml(license.license)}</div>`;
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit', Math.round(performance.now()) - $rootScope.onStartTime, $state.current.name);
    }
  }
}

const LicenseComponent = {
  template: require('./license.html'),
  controller: [
    '$log',
    '$rootScope',
    '$state',
    LicenseController
  ]
}

export default LicenseComponent;
