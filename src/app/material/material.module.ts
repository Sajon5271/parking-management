import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

const materialComponents = [
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatFormFieldModule,
  MatButtonToggleModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents],
  providers: [MatNativeDateModule],
})
export class MaterialModule {}
