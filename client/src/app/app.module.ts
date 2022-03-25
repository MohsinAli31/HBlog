import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from './shared.service';
import { AuthGuardsGuard } from './auth-guards.guard';
import { MaterialModule } from './material/material.module';
import { FormComponent } from './form/form.component';
import { PostsComponent } from './posts/posts.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TableComponent } from './table/table.component';
import { CategoryComponent } from './category/category.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { EditpostComponent } from './posts/post-details/editpost/editpost.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    FormComponent,
    PostsComponent,
    HeaderBarComponent,
    SideBarComponent,
    TableComponent,
    CategoryComponent,
    CreatePostComponent,
    CreateCategoryComponent,
    PostDetailsComponent,
    EditpostComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [SharedService, AuthGuardsGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
