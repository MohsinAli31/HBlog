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
export class AuthGuardsGuard implements CanActivate {
  constructor(private service: SharedService, private router: Router) {}

  canActivate(): any {
    // console.log('auth service', this.service.isAuthenticated());

    if (localStorage.getItem('currentUser')) {
      console.log('Welcome You are  authorized');
      this.service.getLoginUser();

      return true; // Return true: User is allowed to view route
    } else {
      console.log('You are not authorized');
      this.service.getLoginUser();
      alert('You must Login First ');
      this.router.navigate(['/login']); // Return error and route to login page
      return false; // Return false: user not authorized to view page
    }
  }
}
