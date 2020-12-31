import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  LOCALE_ID
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
    SharedModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
