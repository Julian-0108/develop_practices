import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSelectionRoutingModule } from './profile-selection-routing.module';
import { ProfileSelectionComponent } from './profile-selection.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ProfileSelectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProfileSelectionRoutingModule
  ]
})
export class ProfileSelectionModule { }
