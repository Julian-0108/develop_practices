import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileOptionsRoutingModule } from './profile-options-routing.module';
import { ProfileOptionsComponent } from './profile-options.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProfileOptionsComponent],
  imports: [
    CommonModule,
    ProfileOptionsRoutingModule,
    SharedModule
  ]
})
export class ProfileOptionsModule { }
