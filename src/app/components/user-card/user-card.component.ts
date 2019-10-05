import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../core/models/user';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  @Input() user:User;

  constructor() { }

  ngOnInit() {
  }

}
