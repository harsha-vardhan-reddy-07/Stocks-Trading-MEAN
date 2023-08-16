import { HttpClient } from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit{

  orders: any[] = [];

  ngOnInit(): void {
      this.fetchOrders();
  }

  constructor(private http: HttpClient){}

  fetchOrders(){
    this.http.get<any>('http://localhost:6001/fetch-orders').subscribe(
      (response)=>{
        this.orders = response.reverse();
      }
    )
  }
}
