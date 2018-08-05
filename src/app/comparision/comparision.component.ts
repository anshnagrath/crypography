import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.css']
})
export class ComparisionComponent implements OnInit {
  public pieChartLabels: string[];
  public pieChartData: number[];
  public pieChartType: string = 'pie';
  public comparisonData;
  public actulaPrice;
  public obj = {};
  public obj1 = {};


  constructor(public actRoute: ActivatedRoute) {
    this.actRoute.params.subscribe((params) => {
      console.log(params, 'params');
      this.comparisonData = JSON.parse(params.data);
      console.log(this.comparisonData, 'params');
      this.loadData();
    });
  }
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
  loadData() {
    this.obj = {};
    this.obj1 = {};
    this.comparisonData.forEach((element, index) => {
      console.log(element[0], 'ele=====><><')
      if (element.quotes && element.quotes.price) {
        (element.quotes.percent_change_24h < 0) ? this.obj[index] = element.quotes.price - (Math.abs(element.quotes.percent_change_24h) / 100 * element.quotes.price) : this.obj[index] = element.quotes.price + (Math.abs(element.quotes.percent_change_24h) / 100 * element.quotes.price);
      }
      if (element[0]) {
        this.obj1['first'] = element[0];
      }
      if (element[1]) {
        this.obj1['secound'] = element[1];
      }

    });
  }

  ngOnInit() {
    const value = Object.values(this.obj1);
    this.pieChartLabels = [value[0].toString(), value[1].toString()];
    this.pieChartData = [this.obj[0], this.obj[1]];

  }

}
