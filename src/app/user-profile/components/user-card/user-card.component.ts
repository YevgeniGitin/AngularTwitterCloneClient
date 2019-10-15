import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { User } from '../../../core/models/user';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit,OnDestroy {
  @Input() user:User;
  language:string;
  languageSub: Subscription;

  constructor(private localizationService:LocalizationService) {
    this.languageSub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
  }
//unsubscribe()
  ngOnDestroy(){
    this.languageSub.unsubscribe();
  }
}
