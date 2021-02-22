import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorRoutingModule } from './error-routing.module';
import { ErrorComponent } from './error.component';
import { SharedModule } from '../../shared/shared.module';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}
@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    SharedModule,
    ErrorRoutingModule,
    LottieModule.forRoot({ player: playerFactory })
  ]
})
export class ErrorModule { }
