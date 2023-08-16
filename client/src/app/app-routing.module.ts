import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/user/home/home.component';
import { HistoryComponent } from './components/user/history/history.component';
import { PortfolioComponent } from './components/user/portfolio/portfolio.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { StockChartComponent } from './components/user/stock-chart/stock-chart.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminStockChartComponent } from './components/admin/admin-stock-chart/admin-stock-chart.component';
import { AllOrdersComponent } from './components/admin/all-orders/all-orders.component';
import { AllTransactionsComponent } from './components/admin/all-transactions/all-transactions.component';
import { AllUsersComponent } from './components/admin/all-users/all-users.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'portfolio', component: PortfolioComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'stock/:id', component: StockChartComponent},


  {path: 'admin', component: AdminHomeComponent},
  {path: 'admin-stock/:id', component: AdminStockChartComponent},
  {path: 'all-orders', component: AllOrdersComponent},
  {path: 'all-transactions', component: AllTransactionsComponent},
  {path: 'all-users', component: AllUsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
