angular.module('app.services').factory('sidebarService', [
  '$log',
  '$document',
  '$interval',
  ($log, $document, $interval) => {
    const SidebarService = {};
    SidebarService.sidebarEnabled = false;

    SidebarService.toggleSidebar = () => {
      if (SidebarService.sidebarEnabled) {
        SidebarService.disableSidebar();
      } else {
        SidebarService.enableSidebar();
      }
    };

    SidebarService.enableSidebar = () => {
      $document.find('html').addClass('nav-open');
      $interval(() => {
        $document.find('.navbar-toggler').addClass('toggled');
      }, 430, 1);

      const $layer = angular.element('<div class="close-layer"></div>');
      if ($document.find('body').find('.main-panel').length !== 0) {
        $document.find('body').find('.main-panel').append($layer);
      } else if (($document.find('body').hasClass('off-canvas-sidebar'))) {
        $document.find('.wrapper-full-page').append($layer);
      }
      $interval(() => {
        $layer.addClass('visible');
      }, 100, 1);

      $layer.click(() => {
        SidebarService.disableSidebar();
      });
      SidebarService.sidebarEnabled = true;
    };

    SidebarService.disableSidebar = () => {
      $document.find('html').removeClass('nav-open');
      $document.find('.close-layer').removeClass('visible');
      $interval(() => {
        $document.find('.close-layer').remove();
        $document.find('.toggled').removeClass('toggled');
      }, 400, 1);
      SidebarService.sidebarEnabled = false;
    };

    return SidebarService;
  },
]);
