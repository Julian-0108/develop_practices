import { NgModule } from '@angular/core';

import { AdminMasterInfoRoutingModule } from './admin-master-info-routing.module';
import { AdminMasterInfoComponent } from './admin-master-info.component';
import { SharedModule } from '@shared/shared.module';
import { MasterInfoComponent } from './master-info/master-info.component';
import { HistoryMasterComponent } from './history/history-master.component';


@NgModule({
  declarations: [AdminMasterInfoComponent, MasterInfoComponent,HistoryMasterComponent],
  imports: [
    SharedModule,
    AdminMasterInfoRoutingModule
  ]
})
export class AdminMasterInfoModule { }
