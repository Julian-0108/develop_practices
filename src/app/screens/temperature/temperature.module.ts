import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureComponent } from './temperature.component';


@NgModule({
  declarations: [TemperatureComponent],
  imports: [
    CommonModule,
    TemperatureRoutingModule
  ]
})
export class TemperatureModule { }
