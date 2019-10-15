import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LogInGuard } from '../core/guards/log-in.guard';
const routes: Routes = [
  {path:'logIn',component:LogInFormComponent,canActivate:[LogInGuard]},
  {path:'register',component:RegisterFormComponent,canActivate:[LogInGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAuthenticationRoutingModule{ }
