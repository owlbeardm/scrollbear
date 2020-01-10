
describe('Components', () => {
  describe('CharacterItemComponent', () => {
    let $componentController; let $log; let $state; let characterService; let CLASSES;
    let controller;

    beforeEach(() => {
      angular.mock.module('ui.router');
      angular.mock.module('app.components');
      angular.mock.module('app.constants');
      characterService = {};
      angular.mock.module(($provide) => {
        $provide.service('characterService', () => characterService);
      });
      inject((_$componentController_, _$log_, _$state_, _CLASSES_) => {
        $componentController = _$componentController_;
        $log = _$log_;
        $state = _$state_;
        CLASSES = _CLASSES_;
      });
      controller = $componentController('characterItem', {
        $log,
        $state,
        characterService,
        CLASSES,
      });
    });

    it('exists', () => {
      expect(controller).toBeDefined();
    });

    describe('controller', () => {
      describe('$onInit', () => {
        beforeEach(() => {
          controller.characters = [];
          characterService.selectedCharacter = {};
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
          characterService.deleteCharacter = () => {};
        });

        it('exists', () => {
          expect(controller.delete).toBeDefined();
        });

        it('should use delete method of characterService', () => {
          const id = 'id';
          controller.id = id;
          spyOn(characterService, 'deleteCharacter');
          controller.delete();
          expect(characterService.deleteCharacter).toHaveBeenCalled();
          expect(characterService.deleteCharacter).toHaveBeenCalledWith(id);
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
          characterService.selectCharacter = () => {};
        });

        it('exists', () => {
          expect(controller.selectCharacter).toBeDefined();
        });

        it('should select character', () => {
          spyOn(characterService, 'selectCharacter');
          controller.selectCharacter(character);
          expect(characterService.selectCharacter).toHaveBeenCalled();
          expect(characterService.selectCharacter).toHaveBeenCalledWith(character);
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
    });
  });
});
