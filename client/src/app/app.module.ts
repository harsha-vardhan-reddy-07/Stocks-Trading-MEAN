import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/user/home/home.component';
import { HistoryComponent } from './components/user/history/history.component';

import { PortfolioComponent } from './components/user/portfolio/portfolio.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AllUsersComponent } from './components/admin/all-users/all-users.component';
import { AllOrdersComponent } from './components/admin/all-orders/all-orders.component';
import { AllTransactionsComponent } from './components/admin/all-transactions/all-transactions.component';
import { AdminStockChartComponent } from './components/admin/admin-stock-chart/admin-stock-chart.component';
import { StockChartComponent } from './components/user/stock-chart/stock-chart.component';

import { HighchartsChartModule } from 'highcharts-angular';
import { NgxChartsModule } from '@swimlane/ngx-charts'; 
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    HomeComponent,
    HistoryComponent,
    PortfolioComponent,
    ProfileComponent,
    AdminHomeComponent,
    AllUsersComponent,
    AllOrdersComponent,
    AllTransactionsComponent,
    AdminStockChartComponent,
    StockChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
