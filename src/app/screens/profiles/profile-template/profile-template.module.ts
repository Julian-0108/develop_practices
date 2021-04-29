import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileTemplateRoutingModule } from './profile-template-routing.module';
import { ProfileTemplateComponent } from './profile-template.component';
import { SharedModule } from '@shared/shared.module';
import { TitleCasePipe } from '@angular/common';
import { ResponsabilitiesDescComponent } from './responsabilitiesDesc/responsabilities-desc.component';
import { ValoraciontotalComponent } from './valoraciontotal/valoraciontotal.component';

// import { ProfileFormHistoryComponent } from './profile-form-history/profile-form-history.component';


@NgModule({
  declarations: [ProfileTemplateComponent, ResponsabilitiesDescComponent, ValoraciontotalComponent], //ProfileFormHistoryComponent
  imports: [
    CommonModule,
    ProfileTemplateRoutingModule,
    SharedModule,
  ],
  providers: [TitleCasePipe],
})
export class ProfileTemplateModule { }
