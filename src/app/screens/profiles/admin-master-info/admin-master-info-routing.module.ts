import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminMasterInfoComponent } from './admin-master-info.component';


const routes: Routes = [{ path: '', component: AdminMasterInfoComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMasterInfoRoutingModule { }
