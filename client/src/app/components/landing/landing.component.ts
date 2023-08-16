import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit{
  
  
  ngOnInit(): void {
    const userType = localStorage.getItem('usertype');
    if(userType){
      if(userType === 'customer'){
        this.route.navigate(['/home'])
      }else if(userType === 'admin'){
        this.route.navigate(['/admin'])
      }
    }
  }
  
  authType: string = 'login';
  
  changeAuthType(type: string){
    this.authType = type;
  }

  
  email:string = '';
  password:string = '';
  username: string = '';
  userType: string = 'customer';
  
  
  constructor(private http: HttpClient, private route: Router){}

  login(){
    this.http.post('http://localhost:6001/login', {email: this.email, password: this.password}).subscribe(
        (response:any)=>{
          localStorage.setItem('userid', response._id);
          localStorage.setItem('username', response.username);
          localStorage.setItem('email', response.email);
          localStorage.setItem('usertype', response.usertype);
          localStorage.setItem('balance', response.balance);
          this.email = '';
          this.password='';

          if (response.usertype === 'customer'){

            this.route.navigate(['/home']);

          }else if(response.usertype === 'admin'){
            this.route.navigate(['/admin']);
          }

        }, (error)=>{
          alert("login failed!!");
        }
    )
  }


  register (){
    this.http.post('http://localhost:6001/register', {email: this.email, password: this.password, username: this.username, usertype: this.userType}).subscribe(
      (response:any)=>{
        localStorage.setItem('userid', response._id);
        localStorage.setItem('username', response.username);
        localStorage.setItem('email', response.email);
        localStorage.setItem('usertype', response.usertype);
        localStorage.setItem('balance', response.balance);
        this.email = '';
        this.password='';

        if (response.usertype === 'customer'){

          this.route.navigate(['/home']);

        }else if(response.usertype === 'admin'){
          this.route.navigate(['/admin']);
        }
        
      }, (error)=>{
        alert("registration failed!!");
      }
    )
  }




}
