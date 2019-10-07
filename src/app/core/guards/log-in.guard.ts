import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable()
export class LogInGuard implements CanActivate {
  constructor( private router: Router) {}
  
  canActivate() {
    if (localStorage.getItem('user')===null) {//check if localStorage has an id value if yes the user is loged in
      this.router.navigate(['logIn']);
    } else {
      return true;
    }
  }
}
