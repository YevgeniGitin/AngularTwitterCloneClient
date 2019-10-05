import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy  {
islogedin:Observable<boolean>
language:string;
sub: Subscription;
  constructor(private userService:UserService, private router:Router, private localizationService:LocalizationService) { 
    this.islogedin=this.userService.isLogedIn();
    this.sub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
  }

  ngOnInit() {
  }

  logOut(){
    this.userService.logOut();
    this.router.navigate(['home'])
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
