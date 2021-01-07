import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  LOCALE_ID,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// Componentes Imports
import { AppComponent } from './app.component';

import localeEsCo from '@angular/common/locales/es-CO';

import { SharedModule } from "./shared/shared.module";
import { registerLocaleData } from '@angular/common';
import { CoreModule } from './core/core.module';




registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
