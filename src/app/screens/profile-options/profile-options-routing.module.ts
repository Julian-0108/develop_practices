import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileOptionsComponent } from "../profile-options/profile-options.component";

const routes: Routes = [{ path: '', component: ProfileOptionsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileOptionsRoutingModule { }
