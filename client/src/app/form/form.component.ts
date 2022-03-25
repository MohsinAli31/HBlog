import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {}
  list: any = [];
  profile = false;
  selectedFile: any;
  profileForm!: FormGroup;
  imageUrl = '';

  ImageURL!: any;

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      phonenumber: [''],
      bio: [''],
      picture: [],
      gender: [],
    });
    if (localStorage.getItem('currentUser')) {
      this.service.getUserProfileById().subscribe((res) => {
        // console.log('res from userprofile', res);
        if (res) {
          // alert('User Profile is already updated');
          this.list = res;
          this.profile = true;
          this.ImageURL = this.list.userprofile.picture.replace(
            'images',
            'http://localhost:8000'
          );
          this.profileForm = this.fb.group({
            phonenumber: [
              this.list.userprofile.phonenumber,
              [Validators.minLength(11), Validators.required],
            ],
            bio: [this.list.userprofile.bio, [Validators.minLength(11)]],
            picture: [],
            gender: [this.list.userprofile.gender],
          });
        }
        console.log('res from userprofile image', this.imageUrl);
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.profileForm.get('picture')?.setValue(event.target.files[0]);
    console.log('file event is ....', this.selectedFile);
    //////////////////////
    const file = event.target.files[0];

    this.profileForm?.get('img')?.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.ImageURL = reader.result as string;
    };
    reader.readAsDataURL(file);
    console.log('selected event');
  }

  saveForm() {
    const formData = new FormData();
    formData.append('picture', this.profileForm.get('picture')!.value);
    formData.append('phonenumber', this.profileForm.get('phonenumber')!.value);
    formData.append('bio', this.profileForm.get('bio')!.value);
    formData.append('gender', this.profileForm.get('gender')!.value);

    this.service.createUserProfile(formData).subscribe((res) => {
      alert('User Profile created');
      console.log(res);
      this.router.navigate(['userProfile']);
    });
  }
}
