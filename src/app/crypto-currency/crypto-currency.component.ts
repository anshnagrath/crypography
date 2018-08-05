import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chartjs';
@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.css']
})
export class CryptoCurrencyComponent {
  value;
  toView;
  public pieData;
  locatStorage;
  seachQuery;
  selected = true;
  selectedEntities: any[];
  public name = [];
  public price = [];
  public marketCap = [];
  forPie = [];
  public pieChartLabels: string[] = ['Current Price', 'One hour before Price ', 'OneDay before Price'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: string = 'pie';

  // dtTrigger: Subject<any> = new Subject();

  constructor(public appservice: AppService, public router: Router) {
    this.toView = localStorage.getItem('selectedItems');
    if (this.toView !== 'undefined') {
      this.locatStorage = this.toView;
      this.locatStorage = JSON.parse(this.locatStorage);
      console.log(this.locatStorage, 'checking');
    }
    this.loadData();
  }
  setSelectedEntities($event: any) {
    this.selectedEntities = $event;
  }
  toChartView(index) {
    console.log(index, 'index check');
    const selectedCoin = this.forPie[index];
    const price = selectedCoin.price;
    var previousHrPrice = selectedCoin.percent_change_1h;
    if (previousHrPrice < 0) {
      previousHrPrice = selectedCoin.price + selectedCoin.percent_change_1h;
    } else {
      previousHrPrice = selectedCoin.price - selectedCoin.percent_change_1h;
    }
    var sevendaysbackprice = selectedCoin.percent_change_7d;
    (sevendaysbackprice < 0) ? sevendaysbackprice = selectedCoin.price + selectedCoin.percent_change_7d : sevendaysbackprice = selectedCoin.price - selectedCoin.percent_change_7d;
    var onedaybackPrice = selectedCoin.percent_change_24h;
    (onedaybackPrice < 0) ? onedaybackPrice = selectedCoin.price + selectedCoin.percent_change_24h : onedaybackPrice = selectedCoin.price - selectedCoin.percent_change_24h;
    console.log(previousHrPrice, sevendaysbackprice, onedaybackPrice, 'checkssss')
  }
  markAsFavourate(type) {
    if (type === 'fav' || 'done') {
      this.selected = !this.selected;
      console.log(this.selectedEntities, 'getting from local');
      localStorage.setItem('selectedItems', JSON.stringify(this.selectedEntities));
    }
    if (type === 'done') {
      this.router.navigate(['/crpto']);
    }
    if (type === 'com') {

    }
  }
  loadData() {
    const tickers = this.appservice.getTicker().then(res => {
      this.value = [];
      this.name = [];
      console.log(res, 'have a look at this');
      this.value = Object.values(res['data']);
      console.log(this.value, 'check');
      this.value.forEach(element => {
        const obj = {};
        const obj1 = {};
        console.log(element.name, 'check here');
        if (element.name) { obj['name'] = element.name; }
        if (element.quotes && element.quotes.USD) { obj1['quotes'] = element.quotes.USD; }
        if (element.quotes.USD.price) { obj['price'] = element.quotes.USD.price; }
        if (element.quotes.USD.market_cap) {
          obj['marketCap'] = element.quotes.USD.market_cap;
        }
        this.name.push(obj);
        this.forPie.push(obj1);

      });
    });
  }
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}
