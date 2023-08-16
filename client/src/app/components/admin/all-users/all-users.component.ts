import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit{

  users: any[] = [];

  ngOnInit(): void {
      this.fetchUsers();
  }

  constructor(private http: HttpClient){}

  fetchUsers(){
    this.http.get<any>('http://localhost:6001/fetch-users').subscribe(
      (response)=>{
        this.users = response.filter(user=> user.usertype !== 'admin');
      }
    )
  }
}
