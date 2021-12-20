import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  cpi = 4.91;

  categories: string[] = [];

  rows: any[] = [];

  totalBudget = 0;

  personalInflation = 0;

  ngOnInit() {

    this.categories = [
      'Cereals and products',
      'Meat and fish',
      'Egg',
      'Milk and products',
      'Oils and fats',
      'Fruits',
      'Vegetables',
      'Pulses and products',
      'Sugar and Confectionery',
      'Spices',
      'Non-alcoholic beverages',
      'Prepared meals, snacks, sweets etc.',
      'Pan, tobacco and intoxicants',
      'Clothing',
      'Footwear',
      'Housing',
      'Fuel and light',
      'Household goods and services',
      'Health',
      'Transport and communication',
      'Recreation and amusement',
      'Education',
      'Personal care and effects',
    ];

    for (const category of this.categories) {
      this.rows.push({
        category: category,
        amount: 0,
        inflation: 1,
      });
    }
  }

  update(event: any) {

    console.log(event.target.value)
    this.totalBudget = 0;
    for (let row of this.rows) {
      let amount: any = row.amount;
      this.totalBudget += amount;
    }
    console.log(this.totalBudget);
  }

}
