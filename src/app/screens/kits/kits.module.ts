import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import localeCo from '@angular/common/locales/es-CO';

import { KitsRoutingModule } from './kits-routing.module';
import { KitsComponent } from './kits.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from 'src/app/helpers/errors/http-error.interceptor';
import { SharedModule } from '../../shared/shared.module';

registerLocaleData(localeCo, 'es-Co');

@NgModule({
  declarations: [KitsComponent],
  imports: [
    SharedModule,
    KitsRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
})
export class KitsModule { }
