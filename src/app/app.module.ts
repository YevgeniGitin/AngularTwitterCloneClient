import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { MenuModule } from './menu/menu.module';
import { UserAuthenticationModule } from './user-authentication/user-authentication.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { LoggerInterceptor } from './core/logger.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HomeModule,
    SharedModule,
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    UserAuthenticationModule,
    MenuModule,
    UserProfileModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoggerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
