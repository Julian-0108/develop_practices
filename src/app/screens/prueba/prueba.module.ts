import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PruebaRoutingModule } from './prueba-routing.module';
import { CheckAvailabilityComponent } from './check-availability/check-availability.component';
import { AssignAvailabilityComponent } from './assign-availability/assign-availability.component';
import { SharedModule } from '@shared/shared.module';
import { PruebaComponent } from './prueba.component';
import { DialogAvailabilityComponent } from './dialog-availability/dialog-availability.component';
import { DialogKnowledgeComponent } from './dialog-knowledge/dialog-knowledge.component';

@NgModule({
  declarations: [PruebaComponent, CheckAvailabilityComponent, AssignAvailabilityComponent, DialogAvailabilityComponent, DialogKnowledgeComponent],
  imports: [
    SharedModule,
    CommonModule,
    PruebaRoutingModule
  ]
})
export class PruebaModule { }
