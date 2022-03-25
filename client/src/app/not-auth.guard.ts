import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate {
  constructor(private service: SharedService, private router: Router) {}
  canActivate(): any {
    // console.log('auth service', this.service.isAuthenticated());

    if (localStorage.getItem('currentUser')) {
      console.log('You need to logout to get access to Login/Signup page');
      alert('You need to logout first to get access to Login/Signup page');
      this.router.navigate(['/']);
      return false; // Return true: User is allowed to view route
    } else {
      this.service.getLoginUser();

      // Return error and route to login page
      return true; // Return false: user not authorized to view page
    }
  }
}
