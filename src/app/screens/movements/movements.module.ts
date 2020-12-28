import { NgModule, LOCALE_ID } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HttpErrorInterceptor } from 'src/app/helpers/errors/http-error.interceptor';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';

import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    SharedModule,
    MovementsRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    }
  ]
})
export class MovementsModule { }
