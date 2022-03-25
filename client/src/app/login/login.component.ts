import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { config } from '../config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private service: SharedService
  ) {
    console.log('login component');
    this.service.getLoginUser();
  }
  list: any = [];
  token: string = '';
  userName: any = '';
  userId: number | undefined;
  isLoggedIn = false;

  form = this.fb.group({
    email: [''],
    password: [''],
  });

  onSubmit() {
    // // console.log('form values', this.form.value);
    // // this.list.push(this.form.value);
    this.service.getLogin(this.form.value);
    this.form.reset();
  }

  ngOnInit(): void {
    const tokenn = this.service.isAuthenticated();
    console.log('token from locals storage access is ', tokenn);
    if (localStorage.getItem('currentUser')) {
      console.log('token is available');
      this.service.isLoggedIn = true;
      this.service.username = this.userName;
      this.router.navigate(['dashboard']);
    }
  }
}
