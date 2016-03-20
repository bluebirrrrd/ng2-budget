import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {App} from './app';
import {countTotal} from './lib/utils';
import {BudgetService} from './services/budget.service';
import {budgetItems} from './budget/budget-items.mock';


describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    BudgetService
  ]);

  it('should have a model', inject([ App ], (app) => {
    let md = app.model;
    expect(md.sum).toEqual(0);
    expect(md.description).toEqual('');
  }));

  it('should count total', () => {
    let sum = countTotal(budgetItems);
    expect(sum).toEqual(560);
  });

  it('should read from localStorage', inject([BudgetService], (service) => {
    service.fillWithTestData();
    let items = service.getItems();
    for (let i = 0; i < budgetItems.length; i++) {
      expect(items[i].sum).toEqual(budgetItems[i].sum);
      expect(items[i].description).toEqual(budgetItems[i].description);
    }
  }));

});
