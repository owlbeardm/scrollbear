
function SidebarToggleController($log, sidebarService) {
  $log.debug('SidebarToggleController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('SidebarToggleController init ');
    ctrl.mobile_menu_visible = 0;
  };

  ctrl.toggleSidebar = () => {
    $log.debug('SidebarToggleController toggleSidebar');
    sidebarService.toggleSidebar();
  };
}

const SidebarToggleComponent = {
  template: require('./sidebar-toggle.html'),
  controller: [
    '$log', 'sidebarService', SidebarToggleController,
  ],
  bindings: {},
};

export default SidebarToggleComponent;
