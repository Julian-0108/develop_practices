import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';
import { AuthGuard } from 'src/app/helpers/guards/auth.guard';


const routes: Routes = [
  { path: '', component: NotfoundComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotfoundRoutingModule { }
