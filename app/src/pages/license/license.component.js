"use strict";

const license = require('../../../../resources/license.json');
const showdown = require('showdown');

function LicenseController($log) {
  $log.debug('LicenseController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("LicenseController init");
    const converter = new showdown.Converter({
      tables: true,
      strikethrough: true
    });
    ctrl.legal = `<div>${converter.makeHtml(license.license)}</div>`;
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
