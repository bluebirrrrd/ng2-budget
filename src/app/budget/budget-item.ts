/*
* Interface representing a budget item. It has the sum — some amount spent 
* or gained, and a description that explains the purpose or source of money
*/
export class BudgetItem {
    constructor(
    public sum: number,
    public description: string
    ) { }
}
