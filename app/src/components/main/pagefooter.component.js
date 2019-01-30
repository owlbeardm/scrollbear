"use strict";

function PageFooterController($log) {
  $log.debug('PageFooterController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug('PageFooterController init ');
  }

}

const PageFooterComponent = {
  template: require('./pagefooter.html'),
  controller: [
    '$log', PageFooterController
  ],
  bindings: {}
}

export default PageFooterComponent;
