import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../../core/models/post';
import { User } from '../../../core/models/user';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tweets: Observable<Post[]>;
  user: Observable<User>;
  language: string;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.loadUserPosts(param.get('userId'));
      this.loadUser(param.get('userId'));
    });
  }
//load the user for the user card
  loadUser(userId: string) {
    this.user = this.userService.getUserById(userId);
  }
//loade users posts for the posts list
  loadUserPosts(userId: string) {
    this.tweets = this.postService.getUsersPosts(userId);
  }
}
