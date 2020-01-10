
describe('KnownSpelLevelComponent', () => {
  let $componentController;
  let $log;
  let $state;
  let CLASSES;
  let spellService;
  let filterService;
  let focusService;
  let spellbookService;
  let controller;

  beforeAll(() => {
    filterService = {};
    focusService = {};
    spellService = {};
    spellService.showSpell = (spell) => { expect(typeof spell).toEqual('string'); };
    spellbookService = {};
  });

  beforeEach(() => {
    angular.mock.module('ui.router');
    angular.mock.module('app.components');
    angular.mock.module('app.services');
    angular.mock.module('app.constants');

    angular.mock.module(($provide) => {
      $provide.service('filterService', () => filterService);
      $provide.service('focusService', () => focusService);
      $provide.service('spellService', () => spellService);
      $provide.service('spellbookService', () => spellbookService);
    });

    inject((_$componentController_, _$log_, _$state_, _CLASSES_) => {
      $componentController = _$componentController_;
      $log = _$log_;
      $state = _$state_;
      CLASSES = _CLASSES_;
    });

    controller = $componentController('knownSpellLevel', {
      $log,
      $state,
      filterService,
      focusService,
      spellService,
      spellbookService,
      CLASSES,
    });
  });

  it('exists', () => {
    expect(controller).toBeDefined();
  });

  describe('controller', () => {
    describe('$onInit', () => {
      it('exist and called', () => {
        expect(controller.$onInit).toBeDefined();
        controller.$onInit();
      });
    });

    describe('chooseSpell', () => {
      it('exist', () => {
        expect(controller.chooseSpell).toBeDefined();
      });

      it('provide spell name', () => {
        const spell = { name: 'spell' };
        controller.chooseSpell(spell);
        expect(controller.chooseSpell).toBeDefined();
      });
    });
    //
    //     xit('$translate.use called', () => {
    //       controller.$onInit();
    //       expect($translate.use).toHaveBeenCalled();
    //     });
    //
    //     xit('gasPriceService.getGasPrice called', () => {
    //       spyOn(gasPriceService, 'getGasPrice').and.callThrough();
    //       controller.$onInit();
    //       expect(gasPriceService.getGasPrice).toHaveBeenCalled();
    //     });
    //
    //     xit('gasPriceService.getGasPriceLevel called', () => {
    //       spyOn(gasPriceService, 'getGasPriceLevel').and.callThrough();
    //       controller.$onInit();
    //       expect(gasPriceService.getGasPriceLevel).toHaveBeenCalled();
    //     });
    //   });
  });
});
