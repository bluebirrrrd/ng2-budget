import {BudgetItem} from '../budget/budget-item';
import {countTotal} from '../lib/utils';
import {budgetItems} from '../budget/budget-items.mock';


// SystemJS loader currently doesn't work for npmed vertion of moment.js
// import {moment} from 'moment/src/moment';
let moment = require('moment');  // Workaround for that


export class BudgetService {

    getItems() {
        let allItems: BudgetItem[];
        try {
            allItems = localStorage.budgetItems ? JSON.parse(localStorage.budgetItems) : [];
        } catch (e) {
            allItems = [];
        }
        return allItems;
    }

    addItem(item: BudgetItem) {
        let allItems: BudgetItem[] = this.getItems();
        allItems.push(item);
        localStorage.budgetItems = JSON.stringify(<Array<BudgetItem>>allItems);
    }

    sumUp() {
        let allItems: BudgetItem[] = [];
        let now = moment();

        let sum = countTotal(this.getItems());
        let sumItem: BudgetItem = new BudgetItem(sum, `Sum up (${now.format('MMM D, YYYY')})`);
        allItems.push(sumItem);

        localStorage.budgetItems = JSON.stringify(<Array<BudgetItem>>allItems);
    }

    fillWithTestData() {
        localStorage.budgetItems = JSON.stringify(<Array<BudgetItem>>budgetItems);
    }

}


