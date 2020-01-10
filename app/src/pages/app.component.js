
function AppController($log) {
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('AppController init');
  };

  ctrl.show = () => {
    const popup = angular.element('#modalMetamagic');
    $log.debug('AppController metamagic', popup);
    popup.modal('show');
  };
}

const AppComponent = {
  template: require('./app.html'),
  controller: ['$log', AppController],
};

export default AppComponent;
