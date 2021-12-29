import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManageResumesRoutingModule } from './profile-manage-resumes-routing.module';
import { ProfileManageResumesComponent } from './profile-manage-resumes.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ProfileManageResumesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileManageResumesRoutingModule
  ]
})
export class ProfileManageResumesModule { }
