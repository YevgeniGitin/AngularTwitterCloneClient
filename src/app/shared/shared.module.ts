import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationPipe } from './pipes/translation.pipe';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { TweetComponent } from './components/tweet/tweet.component';
import { TweetActionsComponent } from './components/tweet-actions/tweet-actions.component';
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { TitleComponent } from './components/title/title.component';
import { ConfirmationDirective } from './directives/confirmation.directive';

@NgModule({
  entryComponents: [DialogBoxComponent],
  declarations: [
    TranslationPipe,
    DialogBoxComponent,
    TweetComponent,
    TweetActionsComponent,
    TweetListComponent,
    TitleComponent,
    ConfirmationDirective
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: [
    TranslationPipe,
    DialogBoxComponent,
    TweetComponent,
    TweetActionsComponent,
    TweetListComponent,
    TitleComponent,
    ConfirmationDirective
  ]
})
export class SharedModule {}
