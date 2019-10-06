import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './user-profile/components/profile/profile.component';

const routes: Routes = [
  {path:'profile/:userName',component:ProfileComponent, pathMatch:'full'},
  {path: '',redirectTo:"/home", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
