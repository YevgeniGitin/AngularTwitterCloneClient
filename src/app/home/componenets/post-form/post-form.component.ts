import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from "../../../core/models/post";
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../core/models/user';
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
  sub: Subscription;
  connectUser:User;language:string;
  sub2: Subscription;
  constructor(private postService:PostService, private userService:UserService, private datePipe: DatePipe,private localizationService:LocalizationService) {
    this.sub2=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
   }

  ngOnInit() {
    this.sub=this.userService.connectUser.subscribe(u=>this.connectUser=u);
  }

  onSubmit(){
    let date = new Date();
    let newPost:Post = {
      id: this.postService.createId(),
      img: this.connectUser.img,
      userName: this.connectUser.userName,
      date: this.datePipe.transform(date,'dd/MM/yyyy'),
      text: this.post,
      stars: []
    }
    this.postService.addPost(newPost);
    this.post='';
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }
}
