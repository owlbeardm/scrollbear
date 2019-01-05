"use strict";

function AppController($log, $state, $location, focusService) {
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("AppController init");
    const popup = angular.element("#exampleModal");
    $log.debug('Modal popup', popup);
    popup.on("hidden.bs.modal", function() {
      $log.debug('Modal exiting state', $location.state());
      $state.go('^');
    });
  }

}

const AppComponent = {
  template: require('./app.html'),
  controller: ['$log', '$state', '$location', 'focusService', AppController]
};

export default AppComponent;
