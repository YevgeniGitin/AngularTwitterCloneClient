import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../../../core/services/localization.service';

@Component({
  selector: 'app-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.css']
})
export class LanguageSelectComponent implements OnInit {
  languages:string[];
  language:string;
  constructor(private localizationService:LocalizationService) { 
    this.languages=this.localizationService.languages;
    this.language=localStorage.getItem('language')?localStorage.getItem('language'):'EN'
  }

  ngOnInit() { }

  changeLanguage(){
    localStorage.setItem('language',this.language);
    this.localizationService.changelanguage(this.language);
  }
}
