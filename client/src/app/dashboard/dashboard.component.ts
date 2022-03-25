import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router, private service: SharedService) {}

  logout() {
    this.service.logOut('token');
    this.router.navigate(['/login']);
  }
  alert() {
    alert('button clicked');
  }
  ngOnInit(): void {}
}
