import {BudgetItem} from '../budget/budget-item';

export class BudgetService {
    
    getItems() {
        let allItems: BudgetItem[];

        try {
            allItems = localStorage.budgetItems ? JSON.parse(localStorage.budgetItems) : [];
        } catch(e) {
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
        let allItems: BudgetItem[] = this.getItems();
        let sum = allItems.map(_ => _.sum).reduce((a, b) => a + b);
        let currentDate = new Date();
        let sumItem: BudgetItem = new BudgetItem(sum, `Sum up(${currentDate.getMonth() + 1}/${currentDate.getDate()}/${currentDate.getFullYear()})`);
        allItems.length = 0;
        allItems.push(sumItem);
        localStorage.budgetItems = JSON.stringify(<Array<BudgetItem>>allItems);

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
