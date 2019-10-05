import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  post:string;
  language:string;
  sub: Subscription;

  constructor(private localizationService:LocalizationService) {
    this.sub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
