import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { config } from '../config';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  user: { id: number } | any;
  list: any = [];
  Cid!: number;
  id!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: SharedService,
    private http: HttpClient
  ) {
    this.service.categoryId.subscribe((cid) => {
      this.Cid = cid;
    });

    console.log('constructore called');
    console.log('location', window.location.href);
    console.log('url here is', router.url);
    // this.id = +this.route.snapshot.params['id'];
    // this.route.params.subscribe((params: Params) => {
    //   this.id = params['id'];
    // });
  }

  apicALl() {
    this.service.getPostOnCategorySelect(this.user.id).subscribe((res) => {
      console.log('response api call function', this.user.id);
      this.list = [];
      this.list.push(res);
    });
  }

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params['id'],
    };
    this.service.categoryId.next(this.route.snapshot.params['id']);
    console.log(
      'user id beforeAll',
      this.route.snapshot.params['id'],
      'user',
      this.user.id
    );
    this.route.params.subscribe((params: Params) => {
      this.user.id = params['id'];
      this.user = {
        id: params['id'],
      };
      this.service.categoryId.next(params['id']);
      console.log('user id after', params['id'], 'user', this.user.id);

      this.apicALl();
    });
    // this.service.getPostOnCategorySelect(this.user.id).subscribe((res) => {
    //   console.log('response from catagory post', res);
    //   this.list.push(res);
    // });
  }
}
