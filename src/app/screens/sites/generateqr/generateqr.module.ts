// @Angular Imports
import { NgModule } from '@angular/core';
import { GenerateqrComponent } from './generateqr.component';


// Custom Imports
import { QRCodeModule } from 'angularx-qrcode';
// import { AuthGuard } from '@core/guards/auth.guard';

import { SharedModule } from '@shared/shared.module';
import { GenerateqrRoutingModule } from './generateqr-routing.module';


@NgModule({
  declarations: [GenerateqrComponent],
  imports: [
    GenerateqrRoutingModule,
    SharedModule,
    QRCodeModule
  ],
  providers: [
    // AuthGuard,

  ]
})
export class GenerateqrModule { }
