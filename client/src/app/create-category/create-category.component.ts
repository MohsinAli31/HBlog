import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {}
  selectedFile: any;
  CategoryForm!: FormGroup;
  form = this.fb.group({
    categoryname: [''],
  });
  ngOnInit(): void {
    this.CategoryForm = this.fb.group({
      categoryname: '',
    });
  }

  saveForm() {
    console.log('category value', this.CategoryForm.value.categoryname);
    if (this.CategoryForm.value.categoryname) {
      this.service.createCategory(this.CategoryForm.value).subscribe((res) => {
        alert('category created ');
        this.service.getAllCatagories();
        this.router.navigate(['dashboard']);
      });
      console.log('form values', this.CategoryForm.value);
    } else {
      alert('Please mention your category name');
    }
    // const formData = new FormData();
    // formData.append('picture', this.profileForm.get('picture')!.value);
    // formData.append('title', this.profileForm.get('title')!.value);
    // formData.append('description', this.profileForm.get('description')!.value);
    // formData.append(this.selectedFile, this.profileForm.get('picture')!.value);
    // console.log('form data is ', formData);
    // console.log('form data is ', formData);
    // this.http
    //   .post('http://localhost:8000/post/37/3/create', formData, {
    //     headers: {
    //       Authorization:
    //         'Bearer ' +
    //         JSON.parse(localStorage.getItem('currentUser')!).accesstoken,
    //     },
    //   })
    //   .subscribe((res) => {
    //     console.log('res here', res);
    //   });
  }
}
