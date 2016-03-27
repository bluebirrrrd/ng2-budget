import {BudgetItem} from '../budget/budget-item';


export function countTotal(items: BudgetItem[]): number {
    return items.map(_ => _.sum).reduce((a, b) => a + b, 0);
}

export function getRandomId(): number {
  return (new Date()).getTime()*Math.random();
}
