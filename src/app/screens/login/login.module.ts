// @Angular Imports
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Component Imports
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


// Custom Imports
import { TokenInterceptor } from 'src/app/helpers/validation/token.interceptor';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ]
})
export class LoginModule { }
