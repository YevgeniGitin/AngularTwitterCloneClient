import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { MenuRoutingModule } from './menu-routing.module';
import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [MenuComponent,MenuMobileComponent,LanguageSelectComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    MenuRoutingModule,
    FormsModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
