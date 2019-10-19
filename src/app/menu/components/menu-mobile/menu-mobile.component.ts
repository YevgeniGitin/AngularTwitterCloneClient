import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import { LocalizationService } from '../../../core/services/localization.service';
import { GetUser } from '../../../core/models/user';

@Component({
  selector: 'app-menu-mobile',
  templateUrl: './menu-mobile.component.html',
  styleUrls: ['./menu-mobile.component.css']
})
export class MenuMobileComponent implements OnInit, OnDestroy {
  islogedin:Observable<boolean>
  language:string;
  currentUser:Observable<GetUser>;
  
  sub: Subscription;
    constructor(private userService:UserService, private router:Router, private localizationService:LocalizationService) { 
      this.islogedin=this.userService.isLogedIn();
      this.sub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
      this.currentUser=this.userService.connectUser;
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
