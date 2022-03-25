import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {
    console.log('service data create', this.service.loginUserId);
  }
  catagoryList: any = [];
  list: any = [];
  selectedFile: any;
  profileForm!: FormGroup;
  ngOnInit(): void {
    console.log('catagory list is :', this.catagoryList);
    this.service.getAllCategory().subscribe((res) => {
      this.list.push(res);
      this.list[0].data.map((i: any) => {
        this.catagoryList.push(i);
      });
    });

    this.profileForm = this.fb.group({
      title: [''],
      description: [''],
      picture: [],
      categoryId: [],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.profileForm.get('picture')?.setValue(event.target.files[0]);
    console.log('file event', this.selectedFile);
  }
  saveForm() {
    console.log('form data getiing', this.profileForm.value);
    const formData = new FormData();
    formData.append('picture', this.profileForm.get('picture')!.value);
    formData.append('title', this.profileForm.get('title')!.value);
    formData.append('description', this.profileForm.get('description')!.value);
    // formData.append(this.selectedFile, this.profileForm.get('picture')!.value);
    console.log('form data is ', formData);
    // console.log('form data is ', formData);

    const userLogin = JSON.parse(localStorage.getItem('currentUser')!).id;
    console.log('login', userLogin);
    this.http
      .post(
        `http://localhost:8000/post/${userLogin}/${this.profileForm.value.categoryId}/create`,
        formData,
        {
          headers: {
            Authorization:
              'Bearer ' +
              JSON.parse(localStorage.getItem('currentUser')!).accesstoken,
          },
        }
      )
      .subscribe((res) => {
        console.log('res here', res);
        this.profileForm.reset();
        this.router.navigate(['dashboard']);
      });

    // this.service.createPosts(this.profileForm.value);
  }
}
