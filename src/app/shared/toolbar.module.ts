// Angular Imports
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

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    FlexModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    ToolbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ToolbarModule { }
