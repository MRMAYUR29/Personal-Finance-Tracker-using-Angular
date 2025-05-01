import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private _expenses = new BehaviorSubject<Expense[]>([]);
  expenses$ = this._expenses.asObservable();

  get expenses(): Expense[] {
    return this._expenses.value;
  }

  add(expense: Omit<Expense, 'id'>) {
    const newExpense: Expense = { ...expense, id: uuidv4() };
    this._expenses.next([...this.expenses, newExpense]);
  }

  delete(id: string) {
    const updated = this.expenses.filter(e => e.id !== id);
    this._expenses.next(updated);
  }
}
