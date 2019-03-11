"use strict";

describe('spellService', () => {
  let spellService;

  beforeAll(() => {

  });

  beforeEach(() => {
    angular.mock.module('app.services');
    // angular.mock.module(($provide) => {
    //   $provide.service('authService', () => {
    //     return authService;
    //   });
    //   $provide.constant('__env', __env);
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
