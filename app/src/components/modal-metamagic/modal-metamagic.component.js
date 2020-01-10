
import './modal-metamagic.css';

function ModalMetamagicController($log, $rootScope, spellbookService, $timeout, METAMAGIC) {
  $log.debug('ModalMetamagicController create');
  const ctrl = this;
  const LevelIncreases = ['+0', '+1', '+2', '+3', '+4', '+5', '+6', '+7', '+8', '+9'];

  ctrl.$onInit = () => {
    $log.debug('ModalMetamagicController ctrl.levelIncreases', ctrl.levelIncreases);
    ctrl.labels = [];
    ctrl.levelIncreases = LevelIncreases;
    const popup = angular.element('#modalMetamagic');
    popup.on('show.bs.modal', () => {
      $log.debug('ModalMetamagicController show.bs.modal');
      ctrl.levelSelected = undefined;
      ctrl.castingTimes = METAMAGIC;
      ctrl.spellName = $rootScope.spell.name;
      ctrl.labels = [];
      ctrl.initialLevel = Number.parseInt($rootScope.spellLevel, 10);
      ctrl.levelIncreases = LevelIncreases.slice(0, 10 - ctrl.initialLevel);
      ctrl.levelSelected = 0;
      ctrl.refresh();
    });
  };

  ctrl.addLabel = () => {
    ctrl.labels.push(undefined);
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.delete = (id) => {
    ctrl.labels.splice(id, 1);
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.filteredLabels = () => ctrl.labels
    .filter((x) => !!x)
    .map((x) => x.replace(' spell', ''))
    .sort();

  ctrl.refresh = () => {
    $timeout(() => {
      angular.element('.selectpicker').selectpicker('refresh');
    });
  };

  ctrl.addSpell = () => {
    const spellToAdd = {
      name: $rootScope.spell.name,
      metamagic: true,
      metamagicLabel: ctrl.labels,
    };
    spellbookService.addSpell($rootScope.spell, spellToAdd, undefined, Number.parseInt(ctrl.initialLevel, 10) + Number.parseInt(ctrl.levelSelected, 10));
  };
}

const ModalMetamagicComponent = {
  template: require('./modal-metamagic.html'),
  controller: [
    '$log',
    '$rootScope',
    'spellbookService',
    '$timeout',
    'METAMAGIC',
    ModalMetamagicController,
  ],
};

export default ModalMetamagicComponent;
