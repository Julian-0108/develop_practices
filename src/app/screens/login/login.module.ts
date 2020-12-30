// @Angular Imports
import { NgModule } from '@angular/core';

// Component Imports
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

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
  ]
})
export class LoginModule { }
