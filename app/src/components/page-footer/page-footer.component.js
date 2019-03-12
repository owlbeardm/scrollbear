"use strict";

import './page-footer.css';

function PageFooterController($log) {
  $log.debug('PageFooterController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug('PageFooterController init ');
    if (APP_VERSION) {
      ctrl.version = APP_VERSION;
    }
  }

}

const PageFooterComponent = {
  template: require('./page-footer.html'),
  controller: [
    '$log', PageFooterController
  ],
  bindings: {}
}

export default PageFooterComponent;
