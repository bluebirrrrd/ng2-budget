import {
  it,
  inject,
  injectAsync,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

// Load the implementations that should be tested
import {App} from './app';
import {BudgetService} from './services/budget.service';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App,
    BudgetService
  ]);

  it('should have a model', inject([ App ], (app) => {
    let md = app.model;
    expect(md.sum).toEqual(0);
    expect(md.description).toEqual("");
  }));

});
