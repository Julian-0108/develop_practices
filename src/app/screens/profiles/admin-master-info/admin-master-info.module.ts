import { NgModule } from '@angular/core';

import { AdminMasterInfoRoutingModule } from './admin-master-info-routing.module';
import { AdminMasterInfoComponent } from './admin-master-info.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [AdminMasterInfoComponent],
  imports: [
    SharedModule,
    AdminMasterInfoRoutingModule
  ]
})
export class AdminMasterInfoModule { }
