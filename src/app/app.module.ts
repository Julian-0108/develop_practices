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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';


// Componentes Imports
import { AppComponent } from './app.component';

import localeEsCo from '@angular/common/locales/es-CO';

// Custom Imports
import Rollbar from 'rollbar';
import { SharedModule } from "./shared/shared.module";
import { registerLocaleData } from '@angular/common';
import { RequestInterceptor } from './helpers/interceptors/request.interceptor';
import { ResponseInterceptor, RollbarService } from './helpers/interceptors/response.interceptor';

const rollbarConfig = {
  accessToken: 'c8aa20b1c1d441acb8ad79db3a4a3052',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(@Inject(RollbarService) private rollbar: Rollbar) {}

  handleError(err:any) : void {
    this.rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

registerLocaleData(localeEsCo, 'es-CO');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
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
      provide: ErrorHandler,
      useClass: RollbarErrorHandler
    },
    {
      provide: RollbarService,
      useFactory: rollbarFactory
    },
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
