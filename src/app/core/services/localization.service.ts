import { Injectable } from '@angular/core';
import translationJson from '../../../assets/data/translation.json';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LocalizationService {
  
  private _languages: string[] = ['EN', 'RUS'];
  private lanBehaviorSubject=new BehaviorSubject<string>('EN');
  readonly selectedLanguage = this.lanBehaviorSubject.asObservable();
  private defultLanguage: string[] = translationJson.EN;
  private translationLanguage: string[] = translationJson.EN;

  constructor() {
    if(localStorage.getItem('language')){
      this.changelanguage(localStorage.getItem('language'));
    }
  }
  //provide languages list
  get languages(): string[] {
    return this._languages;
  }
  //change language and push to the BehaviorSubject
  changelanguage(ln:string){
    this.lanBehaviorSubject.next(ln);
    this.translationLanguage=translationJson[ln];
  }
  //translate a word by getting the word and language
  translate(word: string, language: string): string {
    if (language !== 'EN') {
      let index: number = this.defultLanguage.findIndex(o => o === word);
      return this.translationLanguage[index];
    } else {
      return word;
    }
  }
}
