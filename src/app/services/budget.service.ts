import {BudgetItem} from '../budget/budget-item';
import {countTotal, getRandomId} from '../lib/utils';
import {budgetItems} from '../budget/budget-items.mock';


// SystemJS loader currently doesn't work for npmed vertion of moment.js
// import {moment} from 'moment/src/moment';
let moment = require('moment');  // Workaround for that
const BUDGET_ITEMS_KEY = 'budgetItems';

export class BudgetService {

    getItems() {
        let allItems: BudgetItem[];
        try {
            const items = localStorage.getItem(BUDGET_ITEMS_KEY);
            allItems = items ? JSON.parse(items) : [];
        } catch (e) {
            allItems = [];
        }
        return allItems;
    }

    addItem(item: BudgetItem) {
        item.id = getRandomId();
        let allItems: BudgetItem[] = this.getItems();
        allItems.push(item);
        localStorage.setItem(BUDGET_ITEMS_KEY, JSON.stringify(<Array<BudgetItem>>allItems));
    }

    deleteItem(item: BudgetItem) {
        let newItems: BudgetItem[] = this.getItems().filter(i => i.id !== item.id);
        localStorage.setItem(BUDGET_ITEMS_KEY, JSON.stringify(<Array<BudgetItem>>newItems));
    }

    sumUp() {
        let allItems: BudgetItem[] = [];
        let now = moment();

        let sum = countTotal(this.getItems());
        let sumItem: BudgetItem = new BudgetItem(
            getRandomId(), sum, `Sum up (${now.format('MMM D, YYYY')})`);
        allItems.push(sumItem);

        localStorage.setItem(BUDGET_ITEMS_KEY, JSON.stringify(<Array<BudgetItem>>allItems));
    }

    fillWithTestData() {
        localStorage.setItem(BUDGET_ITEMS_KEY, JSON.stringify(<Array<BudgetItem>>budgetItems));
    }

}


