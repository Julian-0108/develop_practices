import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileTemplateComponent } from './profile-template.component';


const routes: Routes = [{ path: '', component: ProfileTemplateComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileTemplateRoutingModule { }
