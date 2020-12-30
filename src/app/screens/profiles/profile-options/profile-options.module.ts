import { NgModule } from '@angular/core';

import { ProfileOptionsRoutingModule } from './profile-options-routing.module';
import { ProfileOptionsComponent } from './profile-options.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [ProfileOptionsComponent],
  imports: [
    ProfileOptionsRoutingModule,
    SharedModule
  ]
})
export class ProfileOptionsModule { }
