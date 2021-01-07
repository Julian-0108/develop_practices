import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileHistoryRoutingModule } from './profile-history-routing.module';
import { ProfileHistoryComponent } from './profile-history.component';


@NgModule({
  declarations: [ProfileHistoryComponent],
  imports: [
    CommonModule,
    ProfileHistoryRoutingModule
  ]
})
export class ProfileHistoryModule { }
