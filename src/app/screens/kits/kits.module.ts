import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KitsRoutingModule } from './kits-routing.module';
import { KitsComponent } from './kits.component';


@NgModule({
  declarations: [KitsComponent],
  imports: [
    CommonModule,
    KitsRoutingModule
  ]
})
export class KitsModule { }
