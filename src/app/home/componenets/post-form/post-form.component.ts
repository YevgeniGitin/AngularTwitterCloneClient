import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DatePipe } from '@angular/common';
import { LocalizationService } from 'src/app/core/services/localization.service';

@Component({
  providers: [DatePipe],
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit, OnDestroy{
  post:string;
  language:string;
  languageSub: Subscription;
  constructor(private postService:PostService, private userService:UserService, private datePipe: DatePipe,private localizationService:LocalizationService) {
    this.languageSub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
  }
//add new post 
  onSubmit(){
    this.postService.addPost(this.post);
    this.post='';
  }

  ngOnDestroy(){
    this.languageSub.unsubscribe();
  }
}
