import { NgModule } from '@angular/core';
import { flush } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PostsComponent } from './posts/posts.component';
import { FormComponent } from './form/form.component';
import { TableComponent } from './table/table.component';
import { CategoryComponent } from './category/category.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { EditpostComponent } from './posts/post-details/editpost/editpost.component';
import { AuthGuardsGuard } from './auth-guards.guard';
import { NotAuthGuard } from './not-auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    canActivate: [NotAuthGuard],
    component: SignupComponent,
  },
  {
    path: 'category/:id',
    component: CategoryComponent,
  },
  {
    path: 'login',
    canActivate: [NotAuthGuard],
    component: LoginComponent,
  },
  {
    path: 'post/edit/:id',
    component: EditpostComponent,
  },

  {
    path: 'dashboard',
    // canActivate: [AuthGuardsGuard],
    component: PostsComponent,
  },
  {
    path: 'post/:id',
    component: PostDetailsComponent,
    canActivate: [AuthGuardsGuard],
  },
  {
    path: 'table',
    component: TableComponent,
    // canActivate: [AuthGuardsGuard],
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [AuthGuardsGuard],
  },
  {
    path: 'createProfile',
    component: FormComponent,
    canActivate: [AuthGuardsGuard],
  },
  {
    path: 'createPost',
    component: CreatePostComponent,
    canActivate: [AuthGuardsGuard],
  },
  {
    path: 'createCategory',
    component: CreateCategoryComponent,
    canActivate: [AuthGuardsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
