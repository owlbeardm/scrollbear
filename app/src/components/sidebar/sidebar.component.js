"use strict";

function SidebarController($log) {
  $log.debug('SidebarController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug('SidebarController init ');
  }

}

const SidebarComponent = {
  template: require('./sidebar.html'),
  controller: [
    '$log', SidebarController
  ],
  bindings: {}
}

export default SidebarComponent;
