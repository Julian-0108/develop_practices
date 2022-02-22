import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileSelectionComponent } from './profile-selection.component';


const routes: Routes = [{path: '', component: ProfileSelectionComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileSelectionRoutingModule { }
