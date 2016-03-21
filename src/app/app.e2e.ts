describe('App', () => {

  beforeEach(() => {
    browser.get('/');
    browser.driver.sleep(500);
    browser.waitForAngular();
  });

  afterEach(() => {
    browser.driver.sleep(500);
    browser.executeScript('window.localStorage.clear()');
    browser.driver.sleep(500);
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'Budget App by Anna Kurylo';
    expect(subject).toEqual(result);
  });

  it('should have <header>', () => {
    let subject = element(by.css('app header')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <table>', () => {
    let subject = element(by.css('app table')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have table title', () => {
    let subject = element(by.css('app table thead th')).getText();
    let result  = 'Budget Table';
    expect(subject).toEqual(result);
  });

  it('should not add item with [invalid] float sum', () => {
    let numField = element(by.css('app form input[type=\'number\']'));
    let textField = element(by.css('app form input[type=\'text\']'));
    let btn = element(by.css('app form button[type=\'submit\']'));

    numField.clear().then(() => numField.sendKeys('3.5'));
    textField.clear().then(() => textField.sendKeys('negative test'));

    btn.click().then(() => {
      expect(numField.getAttribute('value')).toEqual('3.5');
      expect(textField.getAttribute('value')).toEqual('negative test');
    });
  });

  it('should not add item with [invalid] empty description', () => {
    let numField = element(by.css('app form input[type=\'number\']'));
    let textField = element(by.css('app form input[type=\'text\']'));
    let btn = element(by.css('app form button[type=\'submit\']'));

    numField.clear()
      .then(() => numField.sendKeys('90'))
      .then(() => {
        browser.driver.sleep(500);
        btn.click().then(() => {
          expect(numField.getAttribute('value')).toEqual('90');
          expect(textField.getAttribute('value')).toEqual('');
        });
      });
  });

  it('should not add item with [invalid] zero sum', () => {
    let numField = element(by.css('app form input[type=\'number\']'));
    let textField = element(by.css('app form input[type=\'text\']'));
    let btn = element(by.css('app form button[type=\'submit\']'));

    textField.clear()
      .then(() => {
        browser.driver.sleep(500);
        textField.sendKeys('zero case')
          .then(() => {
            browser.driver.sleep(500);
            btn.click().then(() => {
              expect(numField.getAttribute('value')).toEqual('0');
              expect(textField.getAttribute('value')).toEqual('zero case');
            });
          });
      });
  });

 it('should add item', () => {
    let numField = element(by.css('app form input[type=\'number\']'));
    let textField = element(by.css('app form input[type=\'text\']'));
    let btn = element(by.css('app form button[type=\'submit\']'));

    Promise.all([
      numField.clear().then(() => numField.sendKeys('-10')),
      textField.clear().then(() => textField.sendKeys('lunch'))
    ]).then(() => {
      browser.driver.sleep(500);
      btn.click().then( () => {
        // Should become empty
        expect(numField.getAttribute('value')).toEqual('0');
        expect(textField.getAttribute('value')).toEqual('');

        // Should list item in table
        let budgetRow = element.all(by.css('app table tbody tr td'));
        expect(budgetRow.getText()).toEqual(['-10', 'lunch']);

        // Should show correct total
        let budgetTotal = element.all(by.css('app table tfoot tr td')).first();
        expect(budgetTotal.getText()).toEqual('-10');
      });
    });
  });

});
