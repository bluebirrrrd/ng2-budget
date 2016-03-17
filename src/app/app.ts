/*
 * Angular 2 decorators and services
 */
import {Component, OnInit} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';

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
    directives: [FORM_DIRECTIVES],
    templateUrl: '/assets/templates/app.html'
 })
 export class App implements OnInit {

    public budget_items: BudgetItem[];
    public model: BudgetItem = new BudgetItem(0, "");

    constructor(private _budgetService: BudgetService) {
    }

    ngOnInit() {
        this.getItems();
    }

    getItems() {
        this.budget_items = this._budgetService.getItems();
    }

    addItem(model: BudgetItem) {
        console.log("you just submitted:");
        console.log(model);
        this._budgetService.addItem(model);
        this.getItems();
    }

    fillWithTestData() {
        this._budgetService.fillWithTestData();
        this.getItems();
    }
 }
