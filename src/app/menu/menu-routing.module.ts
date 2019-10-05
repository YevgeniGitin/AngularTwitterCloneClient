import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInFormComponent } from '../components/log-in-form/log-in-form.component';
import { RegisterFormComponent } from '../components/register-form/register-form.component';
const routes: Routes = [
  {path:'logIn',component:LogInFormComponent},
  {path:'register',component:RegisterFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
