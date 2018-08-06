import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CryptoCurrencyComponent } from './crypto-currency/crypto-currency.component';
import { ComparisionComponent } from './comparision/comparision.component';
import { PriceComponent } from './price/price.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from 'ng2-data-table';
import { FormsModule } from '@angular/forms';
import { DataFilterPipe } from './pipes/dataFilter';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import Chart from 'chartjs';


@NgModule({
  declarations: [
    AppComponent,
    CryptoCurrencyComponent,
    ComparisionComponent,
    PriceComponent,
    DataFilterPipe,


  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    DataTableModule,
    FormsModule,
    ChartsModule,



    RouterModule.forRoot(
      [
        { path: 'compare/:data', component: ComparisionComponent, pathMatch: 'full' },
        { path: 'price/:data', component: PriceComponent, pathMatch: 'full' },
        { path: '', component: CryptoCurrencyComponent, pathMatch: 'full' },
        { path: '**', component: CryptoCurrencyComponent, pathMatch: 'full' }
      ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
