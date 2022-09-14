import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Expense } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit, OnDestroy {

  private _unsubsribeAll: Subject<void> = new Subject<void>;


  expense: Expense = new Expense();
  constructor(private _expenseService: ExpenseService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (isIdPresent) {
      const id: any = this._activatedRoute.snapshot.paramMap.get('id');
      this._expenseService.getExpense(id)
        .pipe(takeUntil(this._unsubsribeAll))
        .subscribe(data => this.expense = data);
    }
  }

  saveExpense() {
    this._expenseService.saveExpense(this.expense)
      .pipe(takeUntil(this._unsubsribeAll))
      .subscribe(
        data => {
          console.log('response', data)
          this._router.navigateByUrl("/expenses")
        }
      )
  }

  deleteExpense(id: number) {
    this._expenseService.deleteExpense(id)
      .pipe(takeUntil(this._unsubsribeAll))
      .subscribe(
        data => {
          console.log(' deleted response', data);
          this._router.navigateByUrl('/expenses');
        }
      )

  }

  ngOnDestroy(): void {
    this._unsubsribeAll.next();
  }

}
