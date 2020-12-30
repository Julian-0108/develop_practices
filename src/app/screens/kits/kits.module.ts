import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';

import localeCo from '@angular/common/locales/es-CO';

import { KitsRoutingModule } from './kits-routing.module';
import { KitsComponent } from './kits.component';

import { SharedModule } from '../../shared/shared.module';

registerLocaleData(localeCo, 'es-Co');

@NgModule({
  declarations: [KitsComponent],
  imports: [
    SharedModule,
    KitsRoutingModule,
  ],
  providers: [
  ]
})
export class KitsModule { }
