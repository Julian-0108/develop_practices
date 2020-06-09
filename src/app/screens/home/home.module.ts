// @Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Modules Imports
import { FlexLayoutModule } from '@angular/flex-layout';

// Component Imports
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

// Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// Custom Imports
import { QRCodeModule } from 'angularx-qrcode';
import { AuthGuard } from 'src/app/helpers/guards/auth.guard';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    FlexLayoutModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,

    QRCodeModule
  ],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule { }
