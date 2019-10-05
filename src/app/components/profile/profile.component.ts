import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/post';
import { User } from '../../core/models/user';
import { PostService } from '../../core/services/post.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tweets:Observable<Post[]>;
  user:Observable<User>;

  constructor( private route: ActivatedRoute,private postService:PostService, private userService:UserService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.loadProfile(param.get('userName'));
      this.loadUser(param.get('userName'));
    });
  }

  loadUser(userName:string){
    this.user=this.userService.getUser(userName);
  }

  loadProfile(userName:string){
    this.tweets=this.postService.getUsersPosts(userName);
  }

}
