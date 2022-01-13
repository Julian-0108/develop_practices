import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddResumeRoutingModule } from './add-resume-routing.module';
import { AddResumeComponent } from './add-resume.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule }  from '@angular/forms';


@NgModule({
  declarations: [
    AddResumeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AddResumeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AddResumeModule { }
