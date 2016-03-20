describe('App', () => {

  beforeEach(() => {
    browser.get('/');
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

});
