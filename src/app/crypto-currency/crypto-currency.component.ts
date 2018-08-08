import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crypto-currency',
  templateUrl: './crypto-currency.component.html',
  styleUrls: ['./crypto-currency.component.css']
})
export class CryptoCurrencyComponent {
  value;
  toView;
  tapped;
  public currentPrice;
  public yesterdaysPrice;
  public aWeekAgo;
  pieView = true;
  public pieData;
  locatStorage;
  seachQuery;
  selected = true;
  selectedEntities: any[];
  public name = [];
  public price = [];
  public marketCap = [];
  forPie = [];
  public pieChartLabels: string[] = ['Current Price', 'One hour Ago Price ', 'Yesterdays Price'];
  public pieChartData: number[];
  public pieChartType: string = 'pie';
  public index = [];

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
  onTap(index) {
    this.selected = false;
    this.pieView = true;
  }
  toChartView(index) {
    const selectedCoin = this.forPie[index];
    this.pieChartData = [];
    previousHrPrice = '';
    onedaybackPrice = '';
    var previousHrPrice = selectedCoin.quotes.percent_change_1h;
    if (previousHrPrice < 0) {
      previousHrPrice = selectedCoin.quotes.price - (Math.abs(selectedCoin.quotes.percent_change_1h) / 100 * selectedCoin.quotes.price);
    }
    else { previousHrPrice = selectedCoin.quotes.price + (Math.abs(selectedCoin.quotes.percent_change_1h) / 100 * selectedCoin.quotes.price); }
    var sevendaysbackprice = selectedCoin.quotes.percent_change_7d;
    if (sevendaysbackprice < 0) {
      sevendaysbackprice = selectedCoin.quotes.price - (Math.abs(selectedCoin.quotes.percent_change_7d) / 100 * selectedCoin.quotes.price);
    }
    else {
      sevendaysbackprice = selectedCoin.quotes.price + ((Math.abs(selectedCoin.quotes.percent_change_7d) / 100 * selectedCoin.quotes.price));
    }
    var onedaybackPrice = selectedCoin.quotes.percent_change_24h;
    if (onedaybackPrice < 0) {
      onedaybackPrice = selectedCoin.quotes.price - (Math.abs(selectedCoin.quotes.percent_change_24h) / 100 * selectedCoin.quotes.price);
    }
    else { onedaybackPrice = selectedCoin.quotes.price + (Math.abs(selectedCoin.quotes.percent_change_24h) / 100 * selectedCoin.quotes.price); }

    (this.tapped == true) ? this.pieView = true : this.pieView = false;
    this.currentPrice = selectedCoin.quotes.price;
    this.yesterdaysPrice = previousHrPrice;
    this.aWeekAgo = onedaybackPrice;
    this.pieChartData = [Number(selectedCoin.quotes.price), Number(previousHrPrice), Number(onedaybackPrice)];

  }
  toPrice(index) {
    let data = this.forPie[index];
    data['name'] = this.name[index].name;
    data = JSON.stringify(data);
    this.router.navigate([`/price/${data}`]);
  }
  markAsFavourate(type) {
    const toNavigate = [];
    const obj = {};
    if (type === 'fav') {
      this.selected = !this.selected;
      localStorage.setItem('selectedItems', JSON.stringify(this.selectedEntities));
    }
    if (type === 'done') {
      this.router.navigate(['/crpto']);
    }
    if (type === 'com') {
      this.selectedEntities.forEach((ele, index) => {
        if (ele.name) { obj[index] = ele.name; }
        this.index.push(this.value.findIndex(o => o.name === ele.name));
      });
      this.index.forEach(idx => {
        toNavigate.push(this.forPie[idx]);
      });
      toNavigate.push(obj);
      const selectedCoins = JSON.stringify(toNavigate);
      this.router.navigate([`/compare/${selectedCoins}`]);
    }
  }
  loadData() {
    const tickers = this.appservice.getTicker().then(res => {
      this.value = [];
      this.name = [];
      this.value = Object.values(res['data']);
      this.value.forEach(element => {
        const obj = {};
        const obj1 = {};
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
