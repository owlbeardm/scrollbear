"use strict";

import './modal-metamagic.css';

function ModalMetamagicController($log, $rootScope, $location, spellService, filterService) {
  $log.debug('ModalMetamagicController create');
  const ctrl = this;

  ctrl.$onInit = function() {


  }

}

const ModalMetamagicComponent = {
  template: require('./modal-metamagic.html'),
  controller: [
    '$log', '$rootScope', '$location', 'spellService', 'filterService', ModalMetamagicController
  ]
}

export default ModalMetamagicComponent;
