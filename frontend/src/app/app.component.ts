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
  source;
  lastUpdate;
  type = 'combined';

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
        amount: null,
        ruralInflation: 1,
        urbanInflation: 1,
        inflation: 1,
      });
    }

    this.source = 'https://pib.gov.in/PressReleasePage.aspx?PRID=1780967';
    this.lastUpdate = 'November 2021';

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

  handleTypeChange(event: any) {
    var target = event.target;
    this.type = target.id;
  }

}
