const license = require('./license.md');

function LicenseController($log, $rootScope, $state) {
  $log.debug('LicenseController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('LicenseController init');
    ctrl.legal = `<div>${license}</div>`;

    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };
}

const LicenseComponent = {
  template: require('./license.html'),
  controller: [
    '$log',
    '$rootScope',
    '$state',
    LicenseController,
  ],
};

export default LicenseComponent;
