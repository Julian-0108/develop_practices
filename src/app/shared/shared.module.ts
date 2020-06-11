// @Angular Imports
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules Imports
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

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FlexModule,

    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  exports: [
    ToolbarComponent
  ]
})
export class SharedModule { }
