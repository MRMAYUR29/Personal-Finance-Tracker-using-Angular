import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ExpenseService } from '../../../services/expense.service';
import { Expense } from '../../../models/expense.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expense-list',
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent {
  
  displayedColumns: string[] = ['title', 'amount', 'category', 'date', 'actions'];
  expenses$: Observable<Expense[]>;
  
  constructor(private expenseService: ExpenseService) {
    this.expenses$ = this.expenseService.expenses$;
  }

  delete(id: string) {
    this.expenseService.delete(id);
  }

}
