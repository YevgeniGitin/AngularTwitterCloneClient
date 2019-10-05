import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { TitleComponent } from './components/title/title.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
    LogInFormComponent,
    RegisterFormComponent,
    TitleComponent,
    ProfileComponent,
    UserCardComponent,
  ],
  imports: [
    HomeModule,
    SharedModule,
    CoreModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MenuModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
