const aboutMd = require('./about.md');

function AboutController($log, $rootScope, $state) {
  $log.debug('AboutController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('AboutController init');
    ctrl.about = `<div>${aboutMd}</div>`;
    if (window.performance) {
      ga('send', 'timing', 'Transition', 'onInit',
        Math.round(performance.now()) - $rootScope.onStartTime,
        $state.current.name);
    }
  };
}

const AboutComponent = {
  template: require('./about.html'),
  controller: [
    '$log',
    '$rootScope',
    '$state',
    AboutController,
  ],
};

export default AboutComponent;
