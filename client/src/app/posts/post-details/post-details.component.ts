import {
  Component,
  Inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { config } from '../../config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit, OnChanges {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {
    console.log('constructor called');
    this.post = {
      id: this.route.snapshot.params['id'],
    };

    this.route.params.subscribe((params: Params) => {
      this.post.id = params['id'];
      this.post = {
        id: params['id'],
      };
      console.log('subscriber called');

      this.apicALl();
    });
    console.log(
      'login user id is',
      JSON.parse(localStorage.getItem('currentUser')!).id
    );
    this.LoginUserId = JSON.parse(localStorage.getItem('currentUser')!).id;
    // this.getAllComments();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('onchange lifecycle method called');
  }
  list: any = [];
  post: { id: number } | any;
  LoginUserId!: number;
  commentList: any = [];
  commentForm!: FormGroup;
  updateForm!: FormGroup;
  flagGetComment: boolean = false;
  display = false;
  likeList: any = [];
  bntStyle!: string;
  likeCount!: number;

  //list of comments for edit
  editComment: any = [];
  editId!: number;
  likedPost() {
    console.log('user liked the post');
    this.service.postLike(this.LoginUserId, this.post.id).subscribe((res) => {
      console.log('res', res);
      // alert('You liked the post');
      this.getLikesByPostId();
    });
  }
  getLikesByPostId() {
    this.service.getLikeByPostId(this.post.id).subscribe((res) => {
      this.likeList = res;
      console.log('resopone from get like by postid', res);
      console.log('res length ', this.likeList.length);
      this.likeCount = this.likeList.length;
    });
  }

  handleSubmit(e: any, comId: any) {
    // e.preventDefault();
    alert('enter key is pressed');
    console.log('comid is coming', comId);
    this.service
      .updateComments(comId, this.updateForm.value)
      .subscribe((res) => {
        console.log(res);
        this.display = false;
        console.log('display after update', this.display);
        this.getAllComments();
      });
    console.log('updateForm', this.updateForm.value);
    // this.router.navigate(['*']);
  }

  handleKeyUp(e: any, comId: any) {
    if (e.keyCode === 13) {
      this.handleSubmit(e, comId);
    }
  }
  onedit(id: any) {
    // console.log('click id is', id);
    this.service.getcommentById(id).subscribe((res) => {
      this.display = true;
      // console.log('res from comments here', res, 'id is ');
      this.editComment = res;
      console.log('id to edit is', this.editComment[0].id);
      this.editId = this.editComment[0].id;
      this.updateForm.value.commenttext = this.editComment[0].commenttext;
    });
  }
  onDelete(id: any) {
    alert('post will be deleted ');
    console.log('deleted post id', id);
    this.service.deletePost(id);
  }
  apicALl() {
    this.service.getPostOnIdSelect(this.post.id).subscribe((res) => {
      console.log('response api call function', this.post.id);
      this.list = [];
      this.list.push(res);

      console.log('list from res', this.list);
    });
  }

  getAllComments() {
    this.service.getComments(this.post.id).subscribe((res) => {
      // console.log('resopone from get Comments', res);
      this.commentList = res;
      this.service.CommentList.next(res);
    });
  }
  deleteComments(id: any) {
    this.service.deleteComments(id).subscribe((res) => {
      console.log(res);
      this.getAllComments();
      alert('Comment Deleted successfully');
    });
  }
  saveForm() {
    this.flagGetComment = true;
    console.log('form data getiing', this.commentForm.value);
    const formData = new FormData();

    formData.append('commenttext', this.commentForm.get('commenttext')!.value);

    // formData.append(this.selectedFile, this.profileForm.get('picture')!.value);
    console.log('form data is ', formData);
    // console.log('form data is ', formData);

    const userLogin = JSON.parse(localStorage.getItem('currentUser')!).id;
    this.service
      .createComments(userLogin, this.post.id, this.commentForm.value)
      .subscribe((res) => {
        console.log(res);
        this.getAllComments();
      });
    // if (this.flagGetComment === true) {
    //   console.log('flagComment');
    //   this.getAllComments();
    //   this.service.CommentList.subscribe((res) => {
    //     console.log('res here from service', res);
    //   });
    // }
  }
  ngOnInit(): void {
    this.commentForm = this.fb.group({
      commenttext: [''],
    });
    this.updateForm = this.fb.group({
      commenttext: [''],
    });
    this.LoginUserId = JSON.parse(localStorage.getItem('currentUser')!).id;
    // console.log('login userid is', this.LoginUserId);
    /////////////////

    ///////////////

    this.getAllComments();
    this.getLikesByPostId();

    // this.service.getComments().subscribe((res) => {
    //   // console.log('resopone from get Comments', res);
    //   this.commentList = res;
    // });
  }
}
