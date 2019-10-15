import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocalizationService } from '../../../core/services/localization.service';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {
  newPost:string;
  language:string;
  sub: Subscription;

  constructor(private localizationService:LocalizationService,private postService:PostService) {
    this.sub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
  }
//save new post
  post(){
    this.postService.addPost(this.newPost);
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
