import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { LogInGuard } from '../core/guards/log-in.guard';

const routes: Routes = [
  {path:'profile/:userName',component:ProfileComponent, pathMatch:'full',canActivate: [LogInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
