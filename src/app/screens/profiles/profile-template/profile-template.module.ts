import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileTemplateRoutingModule } from './profile-template-routing.module';
import { ProfileTemplateComponent } from './profile-template.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [ProfileTemplateComponent],
  imports: [
    CommonModule,
    ProfileTemplateRoutingModule,
    SharedModule
  ]
})
export class ProfileTemplateModule { }