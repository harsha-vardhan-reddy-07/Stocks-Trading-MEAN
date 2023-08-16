import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  actionType:string = 'AddFunds';
  username: string = localStorage.getItem('username');
  userBalance: number = 0;

  depositAmount: number = 0;
  withdrawAmount: number = 0;

  depositType: string = '';
  withdrawType: string = '';

  transactions: any[] = [];

  constructor(private http: HttpClient, private router: Router){
    this.fetchUserdata(localStorage.getItem('userid'));
    this.fetchTransactions(localStorage.getItem('userid'));
  }



  deposit(){
    this.http.post<any>('http://localhost:6001/deposit', {user: localStorage.getItem('userid'), depositAmount: this.depositAmount, depositMode: this.depositType}).subscribe(
      (response)=>{
        
        this.fetchUserdata(localStorage.getItem('userid'));
        this.fetchTransactions(localStorage.getItem('userid'));
        this.actionType = 'Transactions';
        this.depositAmount = 0;
        this.depositType = '';
      }
    ), (error)=>{
      alert('Transaction failed!!');
    }
  }

  withdraw(){
    this.http.post<any>('http://localhost:6001/withdraw', {user: localStorage.getItem('userid'), withdrawAmount: this.withdrawAmount, withdrawMode: this.withdrawType}).subscribe(
      (response)=>{
        
        this.fetchUserdata(localStorage.getItem('userid'));
        this.fetchTransactions(localStorage.getItem('userid'));
        this.actionType = 'Transactions';
        this.withdrawAmount = 0;
        this.withdrawType = '';
      }
    ), (error)=>{
      alert('Transaction failed!!');
    }
  }

  fetchUserdata(id: string){
    this.http.get<any>(`http://localhost:6001/fetch-user/${id}`).subscribe(
      (response)=>{
        if(response){
          this.userBalance = response.balance;
        }
      }
    )
  };

  fetchTransactions(id: string){
    this.http.get<any>(`http://localhost:6001/transactions/${id}`).subscribe(
      (response)=>{
        if(response){
          this.transactions = response.reverse();
        }
      }
    )
  };


  ngOnInit(): void {
    this.fetchUserdata(localStorage.getItem('userid'));
    this.fetchTransactions(localStorage.getItem('userid'));
  }


}
