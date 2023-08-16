import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit{

  stocks: any[] = [];

  userId: string = localStorage.getItem('userid'); 


  constructor(private http: HttpClient, private router: Router){
    this.fetchStocks();
  }

  OpenStockChart(id: string){
    this.router.navigate([`/stock/${id}`]);
  }

  fetchStocks(){
    this.http.get<any>('http://localhost:6001/fetch-stocks').subscribe(
      (response)=>{
        this.stocks = response.filter(stock=> stock.user === this.userId);
      }
    )
  }

  ngOnInit(): void{
    this.fetchStocks();
  }

}
