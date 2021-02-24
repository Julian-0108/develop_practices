import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminprofilesComponent } from './adminprofiles.component';


const routes: Routes = [{ path: '', component: AdminprofilesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminprofilesRoutingModule { }
