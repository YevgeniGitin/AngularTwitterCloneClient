import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../core/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {
  @Input() tweet:Post;

  constructor(private router:Router) { }

  ngOnInit() {
  }
  openProfile(userName:string){
    this.router.navigate(['profile',userName]);
  }

}
