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


@Component({
  providers: [DatePipe],
  selector: 'app-tweet-actions',
  templateUrl: './tweet-actions.component.html',
  styleUrls: ['./tweet-actions.component.css']
})
export class TweetActionsComponent implements OnInit, OnDestroy{
  @Input() tweet:Post;
  sub: Subscription;
  islogedin:Observable<boolean>
  isMyTweet:Observable<boolean>
  sub2: Subscription;
  connectUser:User;
  post:string;

  constructor(private userService:UserService, private postService:PostService, public dialog: MatDialog,private datePipe: DatePipe) {}

  ngOnInit() {
    this.islogedin=this.userService.isLogedIn();
    this.isMyTweet=this.userService.isLogedInUser(this.tweet.userName);
    this.sub2=this.userService.connectUser.subscribe(u=>this.connectUser=u);
  }

  openDialog(){
    let dialogRef=this.dialog.open(DialogBoxComponent);
    this.sub2=dialogRef.afterClosed().subscribe(result => {
      this.post = result;
      if(this.post){
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
      }
    });

  }

  deletePost(e){
    if(e){
      this.postService.deletePost(this.tweet.id);
    }
  }

  clickedOnStar(){
    let user:User;
    this.sub=this.userService.connectUser.subscribe(connectUser=>user=connectUser);
    if(user){
      this.postService.changeStars(this.tweet.id,user.userName);
    }
  }
  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.sub2){
      this.sub2.unsubscribe();
    }
  }
}
