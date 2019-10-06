import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { UserAuthenticationRoutingModule } from './user-authentication-routing.module';



@NgModule({
  declarations: [RegisterFormComponent,LogInFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    UserAuthenticationRoutingModule
  ]
})
export class UserAuthenticationModule { }
