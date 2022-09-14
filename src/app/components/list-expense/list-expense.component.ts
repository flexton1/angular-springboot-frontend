import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrls: ['./list-expense.component.scss']
})
export class ListExpenseComponent implements OnInit, OnDestroy {

  private _unsubsribeAll: Subject<void> = new Subject<void>;
  expenses: Expense[] = [];
  constructor(private _expenseService: ExpenseService) { }

  ngOnInit(): void {
    this._expenseService.getExpenses()
    .pipe(takeUntil(this._unsubsribeAll))
    .subscribe(
      (data) => this.expenses = data
    )
  }

  ngOnDestroy(): void {
    this._unsubsribeAll.next();
  }

}
