import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileManageResumesRoutingModule } from './profile-manage-resumes-routing.module';
import { ProfileManageResumesComponent } from './profile-manage-resumes.component';
import { SharedModule } from '@shared/shared.module';
import { ToolsComponent } from './dialogs/tools/tools.component';
import { SeeResumeComponent } from './dialogs/see-resume/see-resume.component';
import { AssociateGLPIComponent } from './dialogs/associate-glpi/associate-glpi.component';

@NgModule({
  declarations: [
    ProfileManageResumesComponent,
    ToolsComponent,
    SeeResumeComponent,
    AssociateGLPIComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileManageResumesRoutingModule
  ]
})
export class ProfileManageResumesModule { }
