import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Pipe({
  name: 'translation'
})
export class TranslationPipe implements PipeTransform {

  constructor(private localizationService: LocalizationService) {}

  transform(word: string, language: string): string {
    return this.localizationService.translate(word, language);
  }

}
