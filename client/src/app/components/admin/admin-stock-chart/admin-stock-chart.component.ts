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
  selector: 'app-admin-stock-chart',
  templateUrl: './admin-stock-chart.component.html',
  styleUrls: ['./admin-stock-chart.component.css']
})
export class AdminStockChartComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  stockData: any[] = [];
  apiResponses: any[] = [];

  stockSymbol: string; 





  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {

    const routeSub = this.route.params.subscribe(params => {
      this.stockSymbol = params['id'];
      this.fetchStockData(params['id']);
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
          if(response.values){
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

  





  ngOnInit(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.stockSymbol = params['id'];
      this.fetchStockData(params['id']);
    });
  }



}
