import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ChartData, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, BaseChartDirective ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  today = new Date();
  totalExpense: number = 0;
  monthlyExpense: number = 0;
  categoryCount: number = 0;
  categoryMap: { [key: string]: number } = {};
  chartType: any = 'bar';

  // Pie Chart Data
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F7DC6F', '#9B59B6'],
    }],
  };

  // Bar Chart Data for Monthly Expenses
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{
      label: 'Monthly Expenses',
      data: [],
      backgroundColor: '#FF5733',
    }],
  };

  // Pie Chart Options
pieChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `₹${tooltipItem.raw}`;
        }
      }
    }
  }
};

// Bar Chart Options
barChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Expenses (₹)'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `₹${tooltipItem.raw}`;
        }
      }
    }
  }
};


  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    const expenses = this.expenseService.expenses;
    this.calculateTotalExpense(expenses);
    this.calculateMonthlyExpense(expenses);
    this.calculateCategoryCount(expenses);
    this.updateCharts(expenses);
  }

  // Calculate total expenses
  calculateTotalExpense(expenses: Expense[]): void {
    this.totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Calculate monthly expenses
  calculateMonthlyExpense(expenses: Expense[]): void {
    const currentMonth = this.today.getMonth();
    this.monthlyExpense = expenses.filter(
      (expense) => new Date(expense.date).getMonth() === currentMonth
    ).reduce((sum, expense) => sum + expense.amount, 0);
  }

  // Calculate category count
  calculateCategoryCount(expenses: Expense[]): void {
    const categories = expenses.map(expense => expense.category);
    this.categoryCount = new Set(categories).size;
  }

  // Update Pie and Bar Charts
  updateCharts(expenses: Expense[]): void {
    this.updatePieChartData(expenses);
    this.updateBarChartData(expenses);
  }

  // Update Pie Chart Data
  updatePieChartData(expenses: Expense[]): void {
    const categoryMap: { [key: string]: number } = {};
    expenses.forEach(expense => {
      if (categoryMap[expense.category]) {
        categoryMap[expense.category] += expense.amount;
      } else {
        categoryMap[expense.category] = expense.amount;
      }
    });

    this.pieChartData.labels = Object.keys(categoryMap);
    this.pieChartData.datasets[0].data = Object.values(categoryMap);
  }

  // Update Bar Chart Data
  updateBarChartData(expenses: Expense[]): void {
    const monthlyExpenses: { [key: string]: number } = {};
    expenses.forEach(expense => {
      const month = new Date(expense.date).toLocaleString('default', { month: 'long' });
      if (monthlyExpenses[month]) {
        monthlyExpenses[month] += expense.amount;
      } else {
        monthlyExpenses[month] = expense.amount;
      }
    });

    this.barChartData.labels = Object.keys(monthlyExpenses);
    this.barChartData.datasets[0].data = Object.values(monthlyExpenses);
  }
}
