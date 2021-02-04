import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBaseTeamsRoutingModule } from './manage-base-teams-routing.module';
import { ManageBaseTeamsComponent } from './manage-base-teams.component';
import { SharedModule } from '@shared/shared.module';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
    ManageBaseTeamsComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ManageBaseTeamsRoutingModule,
    SharedModule
  ],
})
export class ManageBaseTeamsModule { }
