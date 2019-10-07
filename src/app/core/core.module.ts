import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from './services/user.service';
import { LocalizationService } from './services/localization.service';
import { PostService } from './services/post.service';
import { LoggerInterceptor } from './logger.interceptor';
import { LogInGuard } from './guards/log-in.guard';



@NgModule({
  providers: [
    UserService,
    LocalizationService,
    PostService,
    DatePipe,
    LoggerInterceptor,
    LogInGuard
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
