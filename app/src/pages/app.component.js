
function AppController($log) {
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("AppController init");

  }

  ctrl.show = function() {
    const popup = angular.element("#modalMetamagic");
    $log.debug("AppController metamagic", popup);
    popup.modal('show');
  }

}

const AppComponent = {
  template: require('./app.html'),
  controller: ['$log', AppController],
};

export default AppComponent;
