import { Component, OnInit } from '@angular/core';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  login = false;
  loginUser = false;
  list: any = [];
  profile: boolean = false;
  username = '';
  flag = false;
  constructor(private router: Router, private service: SharedService) {
    this.service.loginFlag.subscribe((login) => {
      this.flag = login;
    });
    this.service.userName.subscribe((name) => {
      this.username = name;
    });
    if (this.service.isAuthenticated()) {
      this.login = true;
    }
    console.log('app component');
  }
  loginCheck() {}
  LoginClick() {
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.login = true;
      // console.log('login user', this.loginUser);
    }
  }
  title = 'blogSignup';
}
