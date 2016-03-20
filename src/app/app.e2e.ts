describe('App', () => {

  beforeEach(() => {
    browser.get('/');
    browser.waitForAngular();
  });

  afterEach(() => {
    browser.driver.sleep(500);
    browser.executeScript('window.localStorage.clear()');
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

  it('should not add invalid item', () => {
    let numField = element(by.css('app form input[type=\'number\']'));
    let textField = element(by.css('app form input[type=\'text\']'));
    let btn = element(by.css('app form button[type=\'submit\']'));

    Promise.all([numField.clear(), textField.clear()]).then(() => {
      numField.sendKeys('3.5');
      textField.sendKeys('negative test');

      return btn.click().then(() => {
        browser.driver.sleep(500);
        expect(numField.getAttribute('value')).toEqual('3.5');
        expect(textField.getAttribute('value')).toEqual('negative test');
      });
    }).then((p) => {
      return Promise.all([p, numField.clear(), textField.clear()]).then(() => {
        numField.sendKeys('90');
        textField.sendKeys('');

        return btn.click().then(() => {
          browser.driver.sleep(500);
          expect(numField.getAttribute('value')).toEqual('90');
          expect(textField.getAttribute('value')).toEqual('');
        });
      });
    }).then((p) => {
      Promise.all([p, numField.clear(), textField.clear()]).then(() => {
        numField.sendKeys('0');
        textField.sendKeys('zero case');
        return btn.click().then(() => {
          browser.driver.sleep(500);
          expect(numField.getAttribute('value')).toEqual('0');
          expect(textField.getAttribute('value')).toEqual('zero case');
        });
      });
    });
  });

 it('should add item', () => {
    // browser.driver.sleep(2000);

    let numField = element(by.css('app form input[type=\'number\']'));
    let textField = element(by.css('app form input[type=\'text\']'));
    let btn = element(by.css('app form button[type=\'submit\']'));

    Promise.all([numField.clear(), textField.clear()]).then( () => {
      numField.sendKeys('-10');
      textField.sendKeys('lunch');

      return btn.click().then( () => {
        browser.driver.sleep(2000);
        expect(numField.getAttribute('value')).toEqual('0');
        expect(textField.getAttribute('value')).toEqual('');
        // element.all(by.css('app table tbody tr td')).then( _ => { console.log(_) });
      });
    });
  });

});
