import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import {  ConfigTableRoutingModule } from "./configTable-routing.module";
import { ConfigTableComponents } from "./configTable.components";

@NgModule({
    declarations: [ ConfigTableComponents ],
  imports: [
    SharedModule,
    ConfigTableRoutingModule
  ]
})

export class ConfigTableModule{}