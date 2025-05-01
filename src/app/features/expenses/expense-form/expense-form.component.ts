import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-expense-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.scss'
})
export class ExpenseFormComponent {

  categories = ['Food', 'Travel', 'Shopping', 'Health', 'Utilities'];
  form: FormGroup;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      amount: [null, Validators.required],
      category: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.expenseService.add(this.form.value);
      this.form.reset({ date: new Date() });
    }
  }
  
}
