import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {path:'logIn',component:LogInFormComponent},
  {path:'register',component:RegisterFormComponent},
  {path:'profile/:userName',component:ProfileComponent, pathMatch:'full'},
  {path: '',redirectTo:"/home", pathMatch:"full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
