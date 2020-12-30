import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminprofilesRoutingModule } from './adminprofiles-routing.module';
import { AdminprofilesComponent } from './adminprofiles.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [AdminprofilesComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminprofilesRoutingModule
  ]
})
export class AdminprofilesModule { }
