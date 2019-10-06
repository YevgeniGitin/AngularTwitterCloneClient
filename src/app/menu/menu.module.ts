import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { FormsModule } from '@angular/forms';
import { UserAuthenticationRoutingModule } from '../user-authentication/user-authentication-routing.module';



@NgModule({
  declarations: [MenuComponent,MenuMobileComponent,LanguageSelectComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    UserAuthenticationRoutingModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
