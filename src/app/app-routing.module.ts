import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { EditingComponent } from './components/editing/editing.component';
import { ListExpenseComponent } from './components/list-expense/list-expense.component';

const routes: Routes = [
  {path: 'expenses', component: ListExpenseComponent},
  {path: 'addexpense', component: AddExpenseComponent},
  {path: 'editexpense/:id', component: EditingComponent},
  {
    path: '',
    redirectTo: '/expenses',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/expenses',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  BrowserModule,
HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
