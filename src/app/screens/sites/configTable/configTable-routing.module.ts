import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigTableComponents } from './configTable.components';

const routes: Routes = [{ path: '', component: ConfigTableComponents}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigTableRoutingModule { }
