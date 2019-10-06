import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
    UserCardComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    SharedModule
  ]
})
export class UserProfileModule { }
