import { Component, OnInit, OnDestroy } from '@angular/core';
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
  languageSub: Subscription;

  constructor(private userService:UserService,private localizationService:LocalizationService) {
    this.languageSub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
  }
//log in
  onSubmit(){
    this.success=this.userService.logIn(this.email,this.password);
  }

  ngOnDestroy(){
    this.languageSub.unsubscribe();
  }

}
