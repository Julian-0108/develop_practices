// @Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';

// Components Imports
import { ToolbarComponent } from './toolbar/toolbar.component';

// Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FlexLayoutModule,
    FlexModule,

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDividerModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: []
})
export class SharedModule { }
