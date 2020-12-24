import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateqrComponent } from './generateqr.component';
import { AuthGuard } from 'src/app/helpers/guards/auth.guard';

const routes: Routes = [
  { path: '', component: GenerateqrComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }