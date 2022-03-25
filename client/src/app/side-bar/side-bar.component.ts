import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { config } from '../config';
import { delay, map } from 'rxjs/operators';
import { ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    private service: SharedService
  ) {
    console.log('sidebar comp');
    this.service.getLoginUser();
    this.service.userName.subscribe((li) => {
      this.login = li;
    });
    this.service.userImage.subscribe((img) => {
      this.image = img;
    });
    this.service.loginFlag.subscribe((login) => {
      this.flag = login;
    });

    console.log('res in category sidebar component constructor');
    this.service.getAllCatagories();
    this.service.cList.subscribe((li) => {
      this.list2 = li;
    });
  }
  list2: any = [];
  list: any = [];
  login: any;
  image: any;
  response: any = [];
  flag = false;
  showCategory(id: any) {
    console.log('id clicked is', id);
    console.log('list in sidebar category list2', this.list2.data);

    // this.router.navigate(['/category', id]);
  }
  logout() {
    this.service.logOut('currentUser');
    this.service.userName.next('NotLogin');
    this.service.userImage.next(
      'data:image/png;base64,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'
    );
    this.service.loginFlag.next(false);
    this.router.navigate(['/login']);
  }
  loginNow() {
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.flag = true;
    }
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
