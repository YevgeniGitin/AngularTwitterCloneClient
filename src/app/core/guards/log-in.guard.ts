import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable()
export class LogInGuard implements CanActivate {
  constructor( private router: Router) {}
  
  canActivate() {
    if (localStorage.getItem('token')) {//check if localStorage has an token value if yes the user is logged in
      this.router.navigate(['home']);
    } else {
      return true;
    }
  }
}
