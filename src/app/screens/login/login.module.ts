// @Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component Imports
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

// Angular Module Imports
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

// Material Imports
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

// Custom Imports
import { TokenInterceptor } from 'src/app/helpers/validation/token.interceptor';
import { UserModels } from 'src/app/screens/login/models/user.models';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,

    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,

    LoginRoutingModule
  ],
  providers: [
    UserModels,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ]
})
export class LoginModule { }
