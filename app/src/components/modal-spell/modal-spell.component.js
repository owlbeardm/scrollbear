
function ModalSpellController($log, $rootScope, $location, spellService, filterService) {
  $log.debug('ModalSpellController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    const popup = angular.element('#modalSpell');
    popup.on('show.bs.modal', () => {
      $log.debug('ModalSpellController show.bs.modal');
      $rootScope.title = `${$rootScope.spell.name} - `;
      ctrl.isFav = filterService.isFav($rootScope.spell);
      ctrl.spellUrl = spellService.spellNameToUrl($rootScope.spell.name);
      $log.debug('ModalSpellController show.bs.modal', ctrl.spellUrl);
      window.ga('set', 'page', `/spells/${ctrl.spellUrl}`);
      window.ga('send', 'pageview');
    });
    popup.on('hidden.bs.modal', () => {
      $log.debug('ModalSpellController hidden.bs.modal', JSON.stringify($location.url()));
      $rootScope.title = '';
      window.ga('set', 'page', $location.url());
      window.ga('send', 'pageview');
    });
  };

  ctrl.changeFav = () => {
    filterService.changeFav($rootScope.spell);
    ctrl.isFav = filterService.isFav($rootScope.spell);
  };
}

const ModalSpellComponent = {
  template: require('./modal-spell.html'),
  controller: [
    '$log', '$rootScope', '$location', 'spellService', 'filterService', ModalSpellController,
  ],
};

export default ModalSpellComponent;
