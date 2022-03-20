import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expense } from '../models/expense';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

private getUrl: string = 'https://springboot-expensetracker.herokuapp.com/api/v1/expenses';

  constructor(private _httpClient: HttpClient) { }


  getExpenses(): Observable<Expense[]> {
  
    return this._httpClient.get<Expense[]>(this.getUrl).pipe(
    map(response => response)

  )
  }

saveExpense(expense: Expense): Observable<Expense> {
   return this._httpClient.post<Expense>(this.getUrl, expense);
}

getExpense(id: number): Observable<Expense> {
  return this._httpClient.get<Expense>(`${this.getUrl}/${id}`).pipe(
    map(response => response)
  )
}


deleteExpense(id: number): Observable<any> {
  return this._httpClient.delete(`${this.getUrl}/${id}`, {responseType: 'text'});
}

}
