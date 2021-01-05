import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MovementsComponent } from './movements.component';
import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: MovementsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovementsRoutingModule { }
