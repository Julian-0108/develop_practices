import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureComponent } from './temperature.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [TemperatureComponent],
  imports: [
    CommonModule,
    TemperatureRoutingModule,

    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class TemperatureModule { }
