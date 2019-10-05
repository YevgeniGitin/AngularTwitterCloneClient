import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';

const MaterialComponents=[
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatDialogModule
];

@NgModule({
  imports: [MaterialComponents,],
  exports:[MaterialComponents]
})
export class MaterialModule { }
