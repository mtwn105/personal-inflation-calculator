import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

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

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get('/api/v1/info').subscribe((data: any) => {
      this.cpi = data[0].cpi;
      this.lastUpdate = data[0].lastUpdated;
      this.source = data[0].source;
    });

    this.http.get('/api/v1/inflation').subscribe((data: any) => {
      for (const category of data) {
        this.rows.push({
          category: category.category,
          amount: null,
          ruralInflation: category.ruralInflation,
          urbanInflation: category.urbanInflation,
          combinedInflation: category.combinedInflation,
        });
      }
    });

  }

  update(event: any) {
    this.totalBudget = 0;
    for (let row of this.rows) {
      let amount: any = row.amount;
      this.totalBudget += amount;
    }
  }

  handleTypeChange(event: any) {
    var target = event.target;
    this.type = target.id;
    this.update(null);
  }

}
