// @Angular Imports
import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  InjectionToken,
  Injector,
  Injectable,
  Inject,
  ErrorHandler
} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Componentes Imports
import { AppComponent } from './app.component';

// Custom Imports
import Rollbar from 'rollbar';
import { LoginModule } from "./screens/login/login.module";
import { SharedModule } from "./shared/shared.module";
import { HttpErrorInterceptor, RollbarService } from 'src/app/helpers/errors/http-error.interceptor';

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



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LoginModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: RollbarErrorHandler
    },
    {
      provide: RollbarService,
      useFactory: rollbarFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
