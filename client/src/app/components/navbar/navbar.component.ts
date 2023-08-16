import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  userType: string | null;

  constructor(private route: Router) {
    this.userType = localStorage.getItem('usertype'); 
  }

  ngOnInit(): void {
    this.userType = localStorage.getItem('usertype');
  }

  logout(){
    localStorage.clear();
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        localStorage.removeItem(key);
      }
    }
    this.route.navigate(['']);
  }

}
