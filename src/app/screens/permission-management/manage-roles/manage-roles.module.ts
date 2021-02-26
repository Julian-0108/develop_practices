import { NgModule } from '@angular/core';

import { ManageRolesRoutingModule } from './manage-roles-routing.module';
import { ManageRolesComponent } from './manage-roles.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [ManageRolesComponent],
  imports: [
    ManageRolesRoutingModule,
    SharedModule
  ]
})
export class ManageRolesModule { }
