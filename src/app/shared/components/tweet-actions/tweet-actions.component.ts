import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../../../core/services/user.service';
import { Post } from '../../../core/models/post';
import { PostService } from '../../../core/services/post.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../../../core/models/user';
import {MatDialog} from '@angular/material';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { DatePipe } from '@angular/common';
import { LocalizationService } from '../../../core/services/localization.service';


@Component({
  providers: [DatePipe],
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.css']
})
export class TweetActionsComponent implements OnInit, OnDestroy{
  @Input() tweet:Post;
  islogedin:Observable<boolean>
  isMyTweet:Observable<boolean>
  connectUserSub: Subscription;
  connectUser:User;
  post:string;
  language:string;
  subLanguage: Subscription;

  constructor(private userService:UserService, private postService:PostService, public dialog: MatDialog,private datePipe: DatePipe, private localizationService:LocalizationService) {
    this.subLanguage=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
  }

  ngOnInit() {
    this.islogedin=this.userService.isLogedIn();
    this.isMyTweet=this.userService.isLogedInUser(this.tweet.userHandle);
    this.connectUserSub=this.userService.connectUser.subscribe(u=>this.connectUser=u);
  }

  openDialog(){
    let dialogRef=this.dialog.open(DialogBoxComponent);
  }

  deletePost(e){
    if(e){
      this.postService.deletePost(this.tweet._id);
    }
  }

  clickedOnStar(){
      this.postService.changeStars(this.tweet._id);
  }
  ngOnDestroy(){
    if(this.connectUserSub){
      this.connectUserSub.unsubscribe();
    }
    if(this.subLanguage){
      this.subLanguage.unsubscribe();
    }
  }
}
