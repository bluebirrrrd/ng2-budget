import {BudgetItem} from '../budget/budget-item';

export class BudgetService {
    
    private _budgetItems: BudgetItem[];
    
    getItems() {
        this._budgetItems = budgetItems;
        return this._budgetItems;
    }

    addItem(new_sum: number, new_description: string) {
        var item: BudgetItem = {
            sum: new_sum,
            description: new_description
        }
        this._budgetItems.push(item);
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
