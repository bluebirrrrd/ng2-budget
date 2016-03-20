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
import {BudgetItem} from './budget/budget-item';
import {budgetItems} from './budget/budget-items.mock';


describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    BudgetService
  ]);

  it('should have a model', inject([ App ], (app) => {
    let md: BudgetItem = app.model;
    expect(md.sum).toEqual(0);
    expect(md.description).toEqual('');
  }));
});

describe('utils', () => {

  it('should count total', () => {
    let sum: number = countTotal(budgetItems);
    expect(sum).toEqual(560);
  });

});

describe('BudgetService', () => {
  beforeEachProviders(() => [
    BudgetService
  ]);

  beforeEach( () => {
    localStorage.clear();
  });

  it('should read from localStorage', inject([BudgetService], (service) => {
    service.fillWithTestData();
    let items: BudgetItem[] = service.getItems();
    for (let i = 0; i < budgetItems.length; i++) {
      expect(items[i].sum).toEqual(budgetItems[i].sum);
      expect(items[i].description).toEqual(budgetItems[i].description);
    }
  }));

  it('should add new item', inject([BudgetService], (service) => {
    let newItem: BudgetItem = new BudgetItem(-30, 'Coffee');
    service.addItem(newItem);
    let resItem = service.getItems()[0];
    expect(resItem.sum).toEqual(newItem.sum);
    expect(resItem.description).toEqual(newItem.description);
  }));

});
