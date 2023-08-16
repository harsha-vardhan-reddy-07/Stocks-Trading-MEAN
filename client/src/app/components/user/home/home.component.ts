import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  trendingStocks: any[] = [];
  allStocks: any[] = [];
  filteredStocks:any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
      this.fetchTrendingStocks();
      this.fetchAllStocks();
  }

  fetchTrendingStocks(): void{
    const optionsTrending = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
      }),
      params: { start: '0' }
    };

    this.http.get<any>('https://mboum-finance.p.rapidapi.com/co/collections/most_actives', optionsTrending)
      .subscribe(
        response => {
          console.log(response.quotes);
          this.trendingStocks = response.quotes;
        },
        error => {
          console.error(error);
        }
      );

  }



  fetchAllStocks(): void{
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }),
      params: {
        exchange: 'NASDAQ',
        format: 'json'
      }
    };

    this.http.get<any>('https://twelve-data1.p.rapidapi.com/stocks', options).subscribe(
      (response)=>{
        console.log(response.data);
        this.allStocks = response.data;
        this.filteredStocks = response.data;
      }
    )
  }

  // filter stocks

  search: string = ''; // Holds the search term

  applyFilter(): void {
    this.filteredStocks = this.allStocks.filter(stock =>
      stock.symbol.includes(this.search) || stock.name.includes(this.search)
    );
  }



  redirectToStock(stockId: number): void {
    this.router.navigate(['/stock/' + 'TSLA']);
  }



}
