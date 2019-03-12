"use strict";

describe('spellService', () => {
  let spellService;

  beforeAll(() => {

  });

  beforeEach(() => {
    angular.mock.module('app.services');
    angular.mock.module('app.constants');
    // angular.mock.module(($provide) => {
    //   $provide.service('filterService', () => {
    //     return {};
    //   });
    // });
    inject((_spellService_) => {
      spellService = _spellService_;
    });
  });

  afterEach(function() {
  });

  it('service exists', () => {
    expect(spellService).toBeDefined();
  });

});
