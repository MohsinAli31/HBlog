import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { config } from '../config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  list: any = [];

  form = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    active: [''],
  });

  onSubmit() {
    console.log('form values', this.form.value);
    this.list.push(this.form.value);
    this.http
      .post(`${config.apiUrl}/user/1/register`, this.form.value)
      .subscribe(
        (res) => {
          alert('user Created Suuccessfull');
          this.form.reset();
          this.router.navigate(['/login']);
        },
        (err) => {
          alert('something went wrong');
        }
      );

    // console.log('list', this.list);

    // this.disable = true;
    // const { child } = this.form.value;
    // const message = `Hello ${child.password} ${child.lastName}  ${this.form.value.degree}`;
    // alert(message);
  }

  ngOnInit(): void {}
}
