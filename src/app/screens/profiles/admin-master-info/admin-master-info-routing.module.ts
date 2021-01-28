import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';
import { AdminMasterInfoComponent } from './admin-master-info.component';


const routes: Routes = [{ path: '', component: AdminMasterInfoComponent, canActivate: [AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMasterInfoRoutingModule { }
