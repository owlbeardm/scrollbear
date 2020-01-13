function HistoryController($log, $state, characterService) {
  $log.debug('HistoryController create');
  const ctrl = this;

  ctrl.$onInit = () => {
    $log.debug('HistoryController init');
  };

  ctrl.changeHistory = () => {
    ctrl.history = characterService.getSelectedCharacter().history;
    $log.debug('HistoryController changeHistory', characterService.getSelectedCharacter());
  };
}

const HistoryComponent = {
  template: require('./history.html'),
  controller: ['$log', '$state', 'characterService', HistoryController],
  bindings: {},
};

export default HistoryComponent;
