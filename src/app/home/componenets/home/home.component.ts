import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { Observable } from 'rxjs';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tweets: Observable<Post[]>;
  isLogedIn: Observable<boolean>;
  post:string;

  constructor(private postService:PostService,private userService:UserService) { }

  ngOnInit() {
    this.tweets=this.postService.tweets;
    this.isLogedIn=this.userService.isLogedIn();
  }

}
