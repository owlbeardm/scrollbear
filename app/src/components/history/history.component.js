"use strict";

function HistoryController($log, $state, spellbookService) {
  $log.debug('HistoryController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("HistoryController init");
  }

  ctrl.changeHistory = function() {

    ctrl.history = spellbookService.selectedCharacter.history;
    $log.debug("HistoryController changeHistory", spellbookService.selectedCharacter);
  }

}

const HistoryComponent = {
  template: require('./history.html'),
  controller: ['$log', '$state', 'spellbookService', HistoryController],
  bindings: {}
}

export default HistoryComponent;
