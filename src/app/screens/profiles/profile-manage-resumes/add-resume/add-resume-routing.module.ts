import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddResumeComponent } from './add-resume.component';


const routes: Routes = [{path: '', component: AddResumeComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddResumeRoutingModule { }
