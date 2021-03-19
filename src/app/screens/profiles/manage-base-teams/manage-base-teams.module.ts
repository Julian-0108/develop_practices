import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBaseTeamsRoutingModule } from './manage-base-teams-routing.module';
import { ManageBaseTeamsComponent } from './manage-base-teams.component';
import { SharedModule } from '@shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';
import { HistoryBaseTeamsComponent } from './history/history-base-teams.component';

@NgModule({
  declarations: [
    ManageBaseTeamsComponent,
    DialogComponent,
    HistoryBaseTeamsComponent
  ],
  imports: [
    CommonModule,
    ManageBaseTeamsRoutingModule,
    SharedModule
  ],
})
export class ManageBaseTeamsModule { }
