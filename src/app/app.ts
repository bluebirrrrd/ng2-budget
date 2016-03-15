/*
 * Angular 2 decorators and services
 */
import {Component, OnInit} from 'angular2/core';

import {BudgetItem} from './budget/budget-item';
import {BudgetService} from './services/budget.service';
/*
 * App Component
 * Top Level Component
 */
 @Component({
    selector: 'app',
    pipes: [ ],
    providers: [BudgetService],
    directives: [ ],
    templateUrl: require('./templates/app.html')
 })
 export class App implements OnInit {

    public budget_items: BudgetItem[];

    constructor(private _budgetService: BudgetService) {
    }

    ngOnInit() {
        this.budget_items = this._budgetService.getItems();
    }
 }

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
