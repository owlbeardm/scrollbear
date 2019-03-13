"use strict";

describe('Components', () => {
  describe('CharacterItemComponent', () => {
    let $componentController, $provide, $log, $state, spellbookService, CLASSES;
    let controller;

    beforeEach(() => {
      angular.mock.module('ui.router');
      angular.mock.module('app.components');
      angular.mock.module('app.constants');
      angular.mock.module(($provide) => {
        $provide.service('spellbookService', () => {
          return spellbookService;
        });
      });
      spellbookService = {};
      inject((_$componentController_, _$log_, _$state_, _CLASSES_) => {
        $componentController = _$componentController_;
        $log = _$log_;
        $state = _$state_;
        CLASSES = _CLASSES_;
      });
      $log, $state, spellbookService, CLASSES;
      controller = $componentController('characterItem', {
        $log: $log,
        $state: $state,
        spellbookService: spellbookService,
        CLASSES: CLASSES
      });
    });

    it('exists', () => {
      expect(controller).toBeDefined();
    });

    describe('controller', () => {
      describe('$onInit', () => {
        beforeEach(() => {
          controller.characters = [];
          spellbookService.selectedCharacter = {};
        });

        it('should init fields', () => {
          expect(controller.$onInit).toBeDefined();
          controller.$onInit();
          expect(controller.classes).toBeDefined();
          expect(controller.characterSelected).toBeDefined();
        });
      });

      describe('delete', () => {

        beforeEach(() => {
          spellbookService.deleteCharacter = function() {};
        });

        it('exists', () => {
          expect(controller.delete).toBeDefined();
        });

        it('should use delete method of spellbookService', () => {
          const id = 'id';
          controller.id = id;
          spyOn(spellbookService, 'deleteCharacter');
          controller.delete();
          expect(spellbookService.deleteCharacter).toHaveBeenCalled();
          expect(spellbookService.deleteCharacter).toHaveBeenCalledWith(id);
        });

        it('should change delete mode', () => {
          controller.delete();
          expect(controller.deleteMode).toBe(false);
        });
      });

      describe('selectCharacter', () => {
        let character;

        beforeEach(() => {
          character = {};
          spellbookService.selectCharacter = function() {};
        });

        it('exists', () => {
          expect(controller.selectCharacter).toBeDefined();
        });

        it('should select character', () => {
          spyOn(spellbookService, 'selectCharacter');
          controller.selectCharacter(character);
          expect(spellbookService.selectCharacter).toHaveBeenCalled();
          expect(spellbookService.selectCharacter).toHaveBeenCalledWith(character);
        });

        it('should initiate trasition prepared', () => {
          spyOn($state, 'go');
          character.prepared = true;
          controller.selectCharacter(character);
          expect($state.go).toHaveBeenCalled();
          expect($state.go).toHaveBeenCalledWith('spellbook.prepared');
        });

        it('should initiate trasition known', () => {
          spyOn($state, 'go');
          character.prepared = false;
          controller.selectCharacter(character);
          expect($state.go).toHaveBeenCalled();
          expect($state.go).toHaveBeenCalledWith('spellbook.known');
        });
      });

      describe('startDelete', () => {
        it('exists', () => {
          expect(controller.startDelete).toBeDefined();
        });

        it('should change delete mode', () => {
          controller.startDelete();
          expect(controller.deleteMode).toBe(true);
        });
      });

      describe('cancelDelete', () => {
        it('exists', () => {
          expect(controller.cancelDelete).toBeDefined();
        });

        it('should change delete mode', () => {
          controller.cancelDelete();
          expect(controller.deleteMode).toBe(false);
        });
      });
    })
  });
});
