import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.model';
import { HomeComponent } from './componenets/home/home.component';
import { TweetComponent } from '../shared/components/tweet/tweet.component';
import { TweetActionsComponent } from '../shared/components/tweet-actions/tweet-actions.component';
import { TweetListComponent } from '../shared/components/tweet-list/tweet-list.component';
import { PostFormComponent } from './componenets/post-form/post-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    PostFormComponent
  ],
  imports: [CommonModule, HomeRoutingModule, MaterialModule,FormsModule,SharedModule]
})
export class HomeModule {}
