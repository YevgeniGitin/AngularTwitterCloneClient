import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../core/models/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.css']
})
export class TweetListComponent implements OnInit {
  @Input() tweets:Observable<Post[]>;
  
  constructor() { }

  ngOnInit() {
  }

}
