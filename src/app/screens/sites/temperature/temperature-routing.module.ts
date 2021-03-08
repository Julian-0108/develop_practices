import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemperatureComponent } from './temperature.component';
// import { AuthGuard } from '@core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: TemperatureComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemperatureRoutingModule { }
