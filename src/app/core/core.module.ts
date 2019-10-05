import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from './services/user.service';
import { LocalizationService } from './services/localization.service';
import { PostService } from './services/post.service';



@NgModule({
  providers: [
    UserService,
    LocalizationService,
    PostService,
    DatePipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
