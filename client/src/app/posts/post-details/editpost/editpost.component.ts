import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.css'],
})
export class EditpostComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {}
  postList: any = [];
  user: { id: number } | any;
  list: any = [];
  selectedFile: any;
  profileForm!: FormGroup;
  title = '';
  filePath!: string;
  ImageURL: any;
  imageFile: any;

  apicALl() {
    this.service.getPostOnIdSelect(this.user.id).subscribe((res) => {
      console.log('response api call function', this.user.id);
      this.postList = [];
      this.postList.push(res);

      console.log('list from res from edit comp postList', this.postList);
    });
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

    ///////////////
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      title: [, [Validators.minLength(4)]],
      description: [''],
      picture: [],
      categoryId: [],
    });
    this.user = {
      id: this.route.snapshot.params['id'],
    };
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user = {
        id: params['id'],
      };
    });
    this.service.getPostOnIdSelect(this.user.id).subscribe((res) => {
      this.postList = [];
      this.postList.push(res);
      console.log('response api call function', this.postList);
      this.ImageURL = this.postList[0].picture.replace(
        'images',
        'http://localhost:8000'
      );
      console.log('old image is', this.ImageURL);
      this.profileForm = this.fb.group({
        title: [this.postList[0].title, [Validators.minLength(4)]],
        description: [this.postList[0].description],
        picture: [
          'http://localhost:8000/1644819466379--IMG_20220110_165915_565.jpg',
        ],
        // picture: [
        //   this.postList[0].picture.replace('images', 'http://localhost:8000'),
        // ],
        // categoryId: [this.postList[0].categoryId],
      });
      console.log('list from res from edit comp postList', this.postList);
      console.log(
        'Profile form data after selecting image is:',
        this.profileForm
      );
    });

    // console.log('title ', console.log('title here: ', this.postList[0].title));
  }

  saveForm() {
    console.log('old image', this.ImageURL);

    console.log('profile forum image', this.profileForm);
    const formData = new FormData();

    formData.append('picture', this.profileForm.get('picture')!.value);
    formData.append('title', this.profileForm.get('title')!.value);
    formData.append('description', this.profileForm.get('description')!.value);
    // formData.append(this.selectedFile, this.profileForm.get('picture')!.value);
    console.log('form data is appending ', formData);

    this.service.upDatePost(formData, this.postList[0].id);
    // this.service.upDatePost(this.profileForm.value, this.postList[0].id);
    // console.log('form data is ', formData);

    // this.service.createPosts(this.profileForm.value);
  }
}
