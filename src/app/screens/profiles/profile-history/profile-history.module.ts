import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileHistoryRoutingModule } from './profile-history-routing.module';
import { ProfileHistoryComponent } from './profile-history.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [ProfileHistoryComponent],
  imports: [
    CommonModule,
    ProfileHistoryRoutingModule,
    SharedModule
  ]
})
export class ProfileHistoryModule { }
