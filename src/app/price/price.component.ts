import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.css']
})
export class PriceComponent implements OnInit {

  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';
  public comparisonData;
  public actulaPrice;
  public yesterdaysPrice;
  public name;
  constructor(public actRoute: ActivatedRoute) {
    this.actRoute.params.subscribe((params) => {
      this.comparisonData = JSON.parse(params.data);
      this.loadData();
    });
  }
  ngOnInit() {
    this.pieChartLabels = ['Current Price', `Yesterday's Price`];
    this.name = this.comparisonData.name;
    this.pieChartData = [Number(this.actulaPrice), Number(this.yesterdaysPrice)];
  }
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
  loadData() {
    this.actulaPrice = this.comparisonData.quotes.price;
    if (this.comparisonData.quotes && this.comparisonData.quotes.price) {
      (this.comparisonData.quotes.percent_change_24h < 0) ? this.yesterdaysPrice = this.comparisonData.quotes.price - (Math.abs(this.comparisonData.quotes.percent_change_24h) / 100 * this.comparisonData.quotes.price) : this.yesterdaysPrice = this.comparisonData.quotes.price + (Math.abs(this.comparisonData.quotes.percent_change_24h) / 100 * this.comparisonData.quotes.price);
    }
  }


}
