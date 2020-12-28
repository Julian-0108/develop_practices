import { NgModule } from '@angular/core';

import { TemperatureRoutingModule } from './temperature-routing.module';
import { TemperatureComponent } from './temperature.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/helpers/errors/http-error.interceptor';
import { SharedModule } from '../../shared/shared.module';
@NgModule({
  declarations: [TemperatureComponent],
  imports: [
    SharedModule,
    TemperatureRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class TemperatureModule { }
