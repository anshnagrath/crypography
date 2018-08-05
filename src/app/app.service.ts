import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Headers } from '@angular/http';
import { throwError } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  BaseUrl = 'https://api.coinmarketcap.com/v2/';
  headers;
  constructor(public http: HttpClient) {
    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
  }
  private httpErrorHandler(error: HttpErrorResponse) {
    return throwError;
  }

  async getListings() {
    const listing = await this.http.get(`${this.BaseUrl}listing/`)
      .pipe(tap(res => console.log('data recived')), catchError(error => of(this.httpErrorHandler))).toPromise();
    return listing;
  }
  async getTicker() {


    const Ticker = this.http.get(`${this.BaseUrl}ticker/`)
      .pipe(tap(res => console.log('data recived')), catchError(error => of(this.httpErrorHandler))).toPromise();
    return Ticker;
  }
  async getTickersBySpecificCurrency(specificCurencyId) {
    const Ticker = await this.http.get(`${this.BaseUrl}ticker/${specificCurencyId}?structure=array/`)
      .pipe(tap(res => console.log('data recived')), catchError(error => of(this.httpErrorHandler)));
    return Ticker;
  }
  async getGlobal(contry?) {
    if (!contry) {
      const globalData = await this.http.get(`${this.BaseUrl}global/`)
        .pipe(tap(res => console.log('data recived')), catchError(error => of(this.httpErrorHandler)));
      return globalData;
    } else {
      const contryWise = await this.http.get(`${this.BaseUrl}global/convert=${contry}/`)
        .pipe(tap(res => console.log('data recived')), catchError(error => of(this.httpErrorHandler)));
      return contryWise;
    }
  }
}