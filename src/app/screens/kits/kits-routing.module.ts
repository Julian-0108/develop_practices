import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KitsComponent } from './kits.component';
import { AuthGuard } from 'src/app/helpers/guards/auth.guard';

const routes: Routes = [
  { path: '', component: KitsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KitsRoutingModule { }
