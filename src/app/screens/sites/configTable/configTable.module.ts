import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import {  ConfigTableRoutingModule } from "./configTable-routing.module";
import { ConfigTableComponents } from "./configTable.components";
import { SitesComponent } from "./dialogs/sites.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [ 
      ConfigTableComponents,
      SitesComponent
    ],
  imports: [
    SharedModule,
    ConfigTableRoutingModule,
    ReactiveFormsModule
  ]
})

export class ConfigTableModule{}