
describe('characters service', () => {
  let characterService;
  let store = {};

  beforeAll(() => {
    const mockLocalStorage = {
      getItem: (key) => (key in store ? store[key] : null),
      setItem: (key, value) => {
        store[key] = `${value}`;
      },
      removeItem: (key) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(Object.getPrototypeOf(localStorage), 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(Object.getPrototypeOf(localStorage), 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(Object.getPrototypeOf(localStorage), 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(Object.getPrototypeOf(localStorage), 'clear')
      .and.callFake(mockLocalStorage.clear);

    window.ga = () => { };
    spyOn(window, 'ga')
      .and.callFake(() => { });
  });

  beforeEach(() => {
    angular.mock.module('app.services');
    angular.mock.module('app.constants');
    inject((_characterService_) => {
      characterService = _characterService_;
    });
    store = {};
  });

  afterEach(() => {
  });

  it('saves current characters to the localstorage', () => {
    characterService.persist();

    expect(Object.getPrototypeOf(localStorage).setItem).toHaveBeenCalledWith('CHARACTERS', jasmine.anything());
  });

  it('adds new character', () => {
    const newCharacter = { name: 'New Character' };

    characterService.addCharacter(newCharacter);

    expect(JSON.parse(store.CHARACTERS)).toEqual(jasmine.arrayContaining([newCharacter]));
  });

  it('doesn\'t add new character if name exists', () => {
    const character = { name: 'Character' };
    characterService.addCharacter(character);
    const oldStore = angular.copy(store.CHARACTERS);
    const newCharacter = { name: 'Character' };

    characterService.addCharacter(newCharacter);

    expect(store.CHARACTERS).toEqual(oldStore);
  });

  it('doesn\'t add new character if name in different case exists', () => {
    const character = { name: 'Character' };
    characterService.addCharacter(character);
    const oldStore = angular.copy(store.CHARACTERS);
    const newCharacter = { name: 'CHARACTER' };

    characterService.addCharacter(newCharacter);

    expect(store.CHARACTERS).toEqual(oldStore);
  });

  it('deletes character by id', () => {
    const character = { name: 'Character' };
    const character2 = { name: 'Character2' };
    const character3 = { name: 'Character3' };
    characterService.addCharacter(character);
    characterService.addCharacter(character2);
    characterService.addCharacter(character3);

    characterService.deleteCharacter(1);
    // console.log(store.CHARACTERS);
    expect(JSON.parse(store.CHARACTERS)).toEqual([character, character3]);
  });

  // it('deletes character by id', () => {
  //   const character = { name: 'Character' };
  //   const character2 = { name: 'Character2' };
  //
  //   characterService.addCharacter(character);
  //   characterService.addCharacter(character2);
  //
  //   characterService.deleteCharacter(1);
  //
  //   expect(JSON.parse(store.CHARACTERS)).toEqual([character, character3]);
  // });
});
