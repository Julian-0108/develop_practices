import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileManageResumesComponent } from './profile-manage-resumes.component';


const routes: Routes = [{path: '', component: ProfileManageResumesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManageResumesRoutingModule { }
