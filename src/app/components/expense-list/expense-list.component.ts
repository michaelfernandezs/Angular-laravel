import { Component ,OnInit,} from '@angular/core';
import { Expense } from '../../models/expense.models';
import { ExpenseService } from '../../services/expense.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-expense-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.scss'
})
export class ExpenseListComponent implements OnInit {
      expense: Expense[] = [];
      total: number = 0;

      constructor(
        private expenseService:ExpenseService
      ) {}

      ngOnInit(): void {
        this.loadDataIntoTable();
      }

      private loadDataIntoTable(): void { 
        this.expenseService.getExpenses().subscribe(expenses => {   
          this.expense = expenses;
          this.calculateTotal();
        });
      }

      private calculateTotal(): void {
        this.total = this.expense.reduce((accumulated,currentValue) =>{
          return accumulated + Number(currentValue.amount);
        },0);
        
      }
}
