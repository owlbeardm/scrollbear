"use strict";

function HistoryController($log, $state, spellbookService, CLASSES) {
  $log.debug('HistoryController create');
  const ctrl = this;

  ctrl.$onInit = function() {
    $log.debug("HistoryController init");
    ctrl.classes = CLASSES;
  }

}

const HistoryComponent = {
  template: require('./history.html'),
  controller: ['$log', '$state', 'spellbookService', 'CLASSES', HistoryController],
  bindings: {
  }
}

export default HistoryComponent;
