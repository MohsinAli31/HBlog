import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {
    if (localStorage.getItem('currentUser')) {
      // this.userName = JSON.parse(localStorage.getItem('currentUser')!).name;

      this.service.getUserProfileById().subscribe((res) => {
        // console.log('res from userprofile', res);
        if (res) {
          // alert('User Profile is already updated');
          this.profileList = res;
          const img = this.profileList.userprofile.picture.replace(
            'images',
            'http://localhost:8000'
          );
          this.service.userImage.next(img);
        }
      });
    }
  }
  profileList: any = [];
  list: any = [];
  profile = false;
  imageUrl = '';
  phonenumber = '';
  bio = '';
  gender = '';
  userName = '';

  ngOnInit(): void {
    if (localStorage.getItem('currentUser')) {
      this.userName = JSON.parse(localStorage.getItem('currentUser')!).name;

      this.service.getUserProfileById().subscribe((res) => {
        // console.log('res from userprofile', res);
        if (res) {
          // alert('User Profile is already updated');
          this.list = res;
          this.profile = true;
          (this.phonenumber = this.list.userprofile.phonenumber),
            (this.bio = this.list.userprofile.bio),
            (this.gender = this.list.userprofile.gender),
            (this.imageUrl = this.list.userprofile.picture.replace(
              'images',
              'http://localhost:8000'
            ));
          console.log(
            'list of userprofile is ,',
            this.phonenumber,
            this.bio,
            this.gender
          );
        }
      });
    }
  }
}
