const characters = require('./characters.json');


describe('Protractor Demo App', () => {
  it('should add one and two', () => {
    // SETUP
    browser.get('http://localhost:9000/spellbook/characters');
    browser.executeScript('window.localStorage.clear();');
    browser.executeScript(`window.localStorage.setItem('CHARACTERS', JSON.stringify(${JSON.stringify(characters)}));`);
    browser.get('http://localhost:9000/spellbook/characters');
    const EC = protractor.ExpectedConditions;
    //

    browser.wait(EC.presenceOf(element.all(by.id('chooseSpell')).first()), 2000);
    element(by.model('$ctrl.filter')).sendKeys('fire b');
    element(by.id('heading0')).click();

    const chs = element.all(by.id('chooseSpell'));
    browser.wait(EC.presenceOf(element.all(by.id('chooseSpell')).first()), 2000);


    expect(chs.count()).toEqual(2); // This is wrong!
    expect(chs.get(0).getText()).toEqual('Fire Breath'); // This is wrong!
    chs.first().click();

    browser.wait(EC.visibilityOf(element.all(by.id('modalSpellLabel')).first()), 2000);
    expect(element.all(by.id('modalSpellLabel')).first().getText()).toEqual('Fire Breath');
    element.all(by.id('modalSpellLabel')).first().element(by.id('spellFav')).click();

    element(by.id('close')).click();
    browser.wait(EC.invisibilityOf(element.all(by.id('modalSpellLabel')).first()), 2000);
  });
});
