import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{

  orders: any[] = [];

  userId: string = localStorage.getItem('userid'); 


  constructor(private http: HttpClient, private router: Router){
    this.fetchOrders();
  }

  fetchOrders(){
    this.http.get<any>('http://localhost:6001/fetch-orders').subscribe(
      (response)=>{
        this.orders = response.filter(order=> order.user === this.userId).reverse();
      }
    )
  }

  ngOnInit(): void{
    this.fetchOrders();
  }
}
