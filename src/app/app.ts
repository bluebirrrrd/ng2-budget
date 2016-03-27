/*
 * Angular 2 decorators and services
 */
import {Component, OnInit} from 'angular2/core';
import {NgForm, FORM_DIRECTIVES} from 'angular2/common';

import {BudgetItem} from './budget/budget-item';
import {BudgetService} from './services/budget.service';
import {countTotal, getRandomId} from './lib/utils';

/*
 * App Component
 * Top Level Component
 */
 @Component({
    selector: 'app',
    pipes: [ ],
    providers: [BudgetService],
    directives: [FORM_DIRECTIVES],
    templateUrl: '/assets/templates/app.html',
    styles: [
        require('./app.scss')
    ]
 })
 export class App implements OnInit {

    public budgetItems: BudgetItem[];
    public model: BudgetItem = new BudgetItem(null, 0, '');
    public total: number;

    constructor(private _budgetService: BudgetService) {
    }

    ngOnInit() {
        this.getItems();
    }

    deleteItem(item: BudgetItem) {
        this._budgetService.deleteItem(item);
        this.getItems();
    }

    getItems() {
        this.budgetItems = this._budgetService.getItems();
        this.countTotal();
    }

    addItem(model: BudgetItem) {
        if (!this.model.sum) return;
        this._budgetService.addItem(model);
        this.getItems();
        this.model.sum = 0;
        this.model.description = '';
    }

    sumUp() {
        this._budgetService.sumUp();
        this.getItems();
    }

    fillWithTestData() {
        this._budgetService.fillWithTestData();
        this.getItems();
    }

    countTotal() {
        this.total = countTotal(this.budgetItems);
    }
 }
