//angular imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

//material imports
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomeService } from './services/home.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,

    FlexLayoutModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [HomeService]
})
export class HomeModule { }
