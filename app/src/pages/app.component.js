
function AppController($log) {
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('AppController init');
  };
}

const AppComponent = {
  template: require('./app.html'),
  controller: ['$log', AppController],
};

export default AppComponent;
