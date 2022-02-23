import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { SharedModule } from '@app/shared/shared.module';
import { SitesComponent } from './configTable/dialogs/sites.component';


@NgModule({
  declarations: [
    SiteComponent,
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule
  ]
})
export class SiteModule { }
