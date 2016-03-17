import {BudgetItem} from '../budget/budget-item';

export class BudgetService {
    
    getItems() {

        var budgetItems: BudgetItem[];

        if (localStorage.budgetItems) {
            budgetItems = JSON.parse(localStorage.budgetItems) || [];
        } else {
            budgetItems = [];
        }

        return budgetItems;
    }


    addItem(item: BudgetItem) {
        
        var allItems: BudgetItem[];

        try {
            allItems = localStorage.budgetItems ? JSON.parse(localStorage.budgetItems) : [];
        } catch(e) {
            allItems = [];
        } finally {
            allItems.push(item);
            localStorage.budgetItems = JSON.stringify(<Array<BudgetItem>>allItems);
        } 

    }

    fillWithTestData() {
        localStorage.budgetItems = JSON.stringify(<Array<BudgetItem>>budgetItems);
    }

}

var budgetItems: BudgetItem[] = [
    {
        sum: 900,
        description: "Salary"
    },
    {
        sum: -150,
        description: "BB-8 toy"
    },
    {
        sum: -20,
        description: "Groceries"
    },
    {
        sum: -200,
        description: "Emergency"
    },
    {
        sum: -50,
        description: "Superman toy"
    },
    {
        sum: 80,
        description: "Loan returned"
    }
]
