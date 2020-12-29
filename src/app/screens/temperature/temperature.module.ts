import { NgModule } from '@angular/core';

import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureComponent } from './temperature.component';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [TemperatureComponent],
  imports: [
    SharedModule,
    TemperatureRoutingModule,
  ],
  providers: [
  ]
})
export class TemperatureModule { }
