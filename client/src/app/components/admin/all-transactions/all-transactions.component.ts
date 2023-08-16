import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent implements OnInit{

  transactions: any[] = [];

  ngOnInit(): void {
      this.fetchTransactions();
  }

  constructor(private http: HttpClient){}

  fetchTransactions(){
    this.http.get<any>('http://localhost:6001/transactions').subscribe(
      (response)=>{
        this.transactions = response.reverse();
      }
    )
  }

}
