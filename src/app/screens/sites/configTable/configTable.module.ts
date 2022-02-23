import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import {  ConfigTableRoutingModule } from "./configTable-routing.module";
import { ConfigTableComponents } from "./configTable.components";
import { SitesComponent } from "./dialogs/sites.component";

@NgModule({
    declarations: [ 
      ConfigTableComponents,
      SitesComponent
    ],
  imports: [
    SharedModule,
    ConfigTableRoutingModule
  ]
})

export class ConfigTableModule{}