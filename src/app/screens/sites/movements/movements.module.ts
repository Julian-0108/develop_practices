import { NgModule, LOCALE_ID } from '@angular/core';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    MovementsComponent
  ],
  imports: [
    SharedModule,
    MovementsRoutingModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    }
  ]
})
export class MovementsModule { }
