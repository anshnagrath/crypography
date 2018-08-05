import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comparision',
  templateUrl: './comparision.component.html',
  styleUrls: ['./comparision.component.css']
})
export class ComparisionComponent implements OnInit {
  public pieChartLabels: string[] = ['Current Price', 'One hour before Price ', 'OneDay before Price'];
  public pieChartData: number[] = [10, 20, 40];
  public pieChartType: string = 'pie';
  constructor() { }
  chartClicked(e: any): void {
    console.log(e);
  }

  chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
  }

}
