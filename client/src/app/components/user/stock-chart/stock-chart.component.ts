import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, ViewChild, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})


export class StockChartComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  stockData: any[] = [];
  apiResponses: any[] = [];

  stockSymbol: string; 
  stockAction: string = 'buy';
  stockPrice: number;

  stockTradeType: string = 'Intraday';
  stockBuyQuantity: number = 0;
  stockSellQuantity: number = 0;

  stockBuyPrice: number = 0;
  stockSellPrice: number = 0;

  stockBuyQuantityChange(value: number){
    this.stockBuyPrice = value * this.stockPrice;
  }
  stockSellQuantityChange(value: number){
    this.stockSellPrice = value * this.stockPrice;
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    const routeSub = this.route.params.subscribe(params => {
      this.stockSymbol = params['id'];
      this.fetchStockData(params['id']);
      this.fetchStockPrice(params['id']);
    });

    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.stockData,  
        }
      ],
      chart: {
        type: "candlestick",
        height: 500
      },
      title: {
        text: this.stockSymbol,
        align: "left"
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
  }


// Transforms stock data into ordered from to make chart

  transformAndAppendData = apiResponse => {
    const close = parseFloat(apiResponse.close);
    const high = parseFloat(apiResponse.high);
    const low = parseFloat(apiResponse.low);
    const open = parseFloat(apiResponse.open);
  
    const datetime = new Date(apiResponse.datetime);
    const timestamp = datetime.getTime();

    const transformedObject = {
      x: timestamp,
      y: [open, high, low, close]
    };

    // Use the spread operator to append the transformed object to the state array
    this.stockData.push(transformedObject);
  };


  // fetch stock data (time-series)
  async fetchStockData(id: string): Promise<void>{
    const options = {
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      }),
      params: {
        symbol: id,
        interval: '1min',
        outputsize: '100',
        format: 'json'
      },
    };

    this.http.get<any>('https://twelve-data1.p.rapidapi.com/time_series', options)
      .subscribe(
        response => {
          console.log('quotes ',response.meta);
          if(response.values){
            console.log('apii ', response.values);
            const apiResponses = response.values;
            console.log(apiResponses);
            apiResponses.forEach((apiResponse: any) => {
            this.transformAndAppendData(apiResponse);
            });
          }
          
        },
        error => {
          console.error(error);
        }
      );
  }



  // fetch stock price

  async fetchStockPrice(id: string): Promise<void>{

    const optionsPrice = {
      params: {
        symbol: id,
        format: 'json',
        outputsize: '30'
      },
      headers: new HttpHeaders( {
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    };

    this.http.get<any>('https://twelve-data1.p.rapidapi.com/price', optionsPrice).subscribe(
      (response)=>{
        console.log("pricee", response.price);
        this.stockPrice = response.price;

      }
    )
  }



  // buy stock

  buyStock(){

    const options = {
      params: {
        symbol: this.stockSymbol,
        outputsize: '1'
      },
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    };


    this.http.get<any>('https://twelve-data1.p.rapidapi.com/symbol_search', options).subscribe(
      (response)=>{
        this.http.post<any>('http://localhost:6001/buyStock', {user: localStorage.getItem('userid'), symbol: this.stockSymbol, name: response.data[0].instrument_name, stockType: this.stockTradeType, stockExchange: response.data[0].exchange, price: this.stockPrice,  count: this.stockBuyQuantity, totalPrice: this.stockBuyPrice}).subscribe(
          (response)=>{
            this.stockBuyQuantity = 0;
            this.router.navigate(['/history']);
          }
        )
      }, (error)=>{
        alert('Transaction failed')
      }
    )
  }


  // sell stock 

  sellStock(){
    const options = {
      params: {
        symbol: this.stockSymbol,
        outputsize: '1'
      },
      headers: new HttpHeaders({
        'X-RapidAPI-Key': '947b801f92msh96b919932628932p1a1413jsncb9cc7188719',
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
      })
    };

    this.http.get<any>('https://twelve-data1.p.rapidapi.com/symbol_search', options).subscribe(
      (response)=>{
        this.http.post<any>('http://localhost:6001/sellStock', {user: localStorage.getItem('userid'), symbol: this.stockSymbol, name: response.data[0].instrument_name, stockType: this.stockTradeType, price: this.stockPrice,  count: this.stockSellQuantity, totalPrice: this.stockSellPrice}).subscribe(
          (response)=>{
            this.stockSellQuantity = 0;
            this.router.navigate(['/history']);
          }
        )
      }, (error)=>{
        alert('Transaction failed')
      }
    )
  }







  ngOnInit(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.stockSymbol = params['id'];
      this.fetchStockData(params['id']);
      this.fetchStockPrice(params['id']);
    });
  }


}