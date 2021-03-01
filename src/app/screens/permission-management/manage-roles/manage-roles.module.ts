import { NgModule } from '@angular/core';

import { ManageRolesRoutingModule } from './manage-roles-routing.module';
import { ManageRolesComponent } from './manage-roles.component';
import { SharedModule } from '@shared/shared.module';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [ManageRolesComponent, AddUserComponent],
  imports: [
    ManageRolesRoutingModule,
    SharedModule
  ]
})
export class ManageRolesModule { }
