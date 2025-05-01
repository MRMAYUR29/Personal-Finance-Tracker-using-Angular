import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { ExpenseListComponent } from './features/expenses/expense-list/expense-list.component';
import { ExpenseFormComponent } from './features/expenses/expense-form/expense-form.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'expenses',
        children: [
          { path: '', component: ExpenseListComponent },
          { path: 'add', component: ExpenseFormComponent },
        ],
      },
    ],
  },
];
