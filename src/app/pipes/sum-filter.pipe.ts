import {BudgetItem} from '../budget/budget-item';
import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'sumFilter'})
export class SumFilterPipe implements PipeTransform {
  transform(allItems: BudgetItem[], [minSum]): BudgetItem[] {
    if (!minSum) return allItems;
    return(allItems.filter(item => item.sum > minSum));
  }

}
