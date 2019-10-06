import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocalizationService } from '../../../core/services/localization.service';
@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit, OnDestroy {
  email:string;
  password:string;
  success:boolean=true;
  language:string;
  sub: Subscription;

  constructor(private router:Router,private userService:UserService,private localizationService:LocalizationService) {
    this.sub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
  }

  onSubmit(){
    this.success=this.userService.logIn(this.email,this.password);
    console.log(this.success);
    if(this.success){
      this.router.navigate(['home'])
    }
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

}
