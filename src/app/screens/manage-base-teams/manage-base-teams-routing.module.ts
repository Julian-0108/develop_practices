import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBaseTeamsComponent } from './manage-base-teams.component';


const routes: Routes = [
  { path: '', component: ManageBaseTeamsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBaseTeamsRoutingModule { }
