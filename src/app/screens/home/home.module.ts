//angular imports
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';


// Custom Imports
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeService } from './services/home.service';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
