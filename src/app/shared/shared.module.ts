import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components Imports
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NotificationComponent } from './components/notification/notification.component';
import { ConfirmComponent } from './components/notification/confirm/confirm.component';
import { ValidatorComponent } from './components/validator/validator.component';
import { NotImageDirective } from './directives/not-image.directive';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from './components/loader/loader.service';
import { LoaderInterceptor } from './components/loader/loader.interceptor';


@NgModule({
  declarations: [
    ToolbarComponent,
    NotificationComponent,
    FooterComponent,
    ConfirmComponent,
    ValidatorComponent,
    NotImageDirective,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarComponent,
    MaterialModule,
    FooterComponent,
    ValidatorComponent,
    LoaderComponent,
    NotImageDirective,
  ],
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    DatePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule {}
