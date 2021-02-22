import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotfoundRoutingModule } from './notfound-routing.module';
import { NotfoundComponent } from './notfound.component';
import { SharedModule } from '../../shared/shared.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    NotfoundRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class NotfoundModule { }
