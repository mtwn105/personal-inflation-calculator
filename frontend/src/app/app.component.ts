import { environment } from './../environments/environment';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from './google-analytics.service';
declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'frontend';
  // declare let gtag: Function;

  cpi = 4.91;
  categories: string[] = [];
  rows: any[] = [];
  totalBudget = 0;
  personalInflation = 0;
  source;
  lastUpdate;
  type = 'combined';
  // baseurl = "http://localhost:3000/"
  isMobile: boolean;
  openModal: boolean;
  baseurl = environment.baseurl;


  constructor(private http: HttpClient, public router: Router, private googleAnalyticsService: GoogleAnalyticsService, private cDRef: ChangeDetectorRef) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-5YQN8PSZ0F',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    });
  }


  ngOnInit() {



    this.http.get(this.baseurl + 'api/v1/info').subscribe((data: any) => {
      this.cpi = data[0].cpi;
      this.lastUpdate = data[0].lastUpdated;
      this.source = data[0].source;
    });

    this.http.get(this.baseurl + 'api/v1/inflation').subscribe((data: any) => {
      for (const category of data) {
        this.rows.push({
          category: category.category,
          amount: null,
          ruralInflation: category.ruralInflation,
          urbanInflation: category.urbanInflation,
          combinedInflation: category.combinedInflation,
          imageUrl: category.imageUrl
        });
      }
    });

    this.googleAnalyticsService.eventEmitter('dataLoad', 'general', '');

  }

  ngAfterViewInit(): void {
    this.loadScript();
  }

  update(event: any) {
    this.totalBudget = 0;
    for (let row of this.rows) {
      let amount: any = row.amount;
      this.totalBudget += amount;
    }
    this.googleAnalyticsService.eventEmitter('amountChange', 'interaction', '');
  }

  handleTypeChange(event: any) {
    var target = event.target;
    this.type = target.id;
    this.update(null);
    this.googleAnalyticsService.eventEmitter('inflationTypeChange', 'interaction', this.type);
  }

  public loadScript() {
    this.cDRef.detectChanges();
    console.log('preparing to load...')
    let form = document.createElement('form');
    let node = document.createElement('script');
    node.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    node.setAttribute('data-payment_button_id', "pl_IaYkkus4X7OLbw");
    node.async = true;
    form.appendChild(node);
    document.getElementsByClassName('payment')[0].appendChild(form);
  }

  checkDevice() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // true for mobile device
      this.isMobile = true;
    } else {
      // false for not mobile device
      this.isMobile = false;
    }
  }

  toggleModal() {
    this.openModal = true;
  }

}

