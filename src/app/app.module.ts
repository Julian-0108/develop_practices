import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  Injectable,
  Inject,
  ErrorHandler,
  LOCALE_ID
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Componentes Imports
import { AppComponent } from './app.component';

import localeEsCo from '@angular/common/locales/es-CO';

import { SharedModule } from "./shared/shared.module";
import { registerLocaleData } from '@angular/common';
import { RequestInterceptor } from './helpers/interceptors/request.interceptor';
import { ResponseInterceptor } from './helpers/interceptors/response.interceptor';


registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
