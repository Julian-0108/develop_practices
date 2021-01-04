import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// Components Imports
import { ToolbarComponent } from "./toolbar/toolbar.component";

import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarComponent,
    MaterialModule,
  ],
  providers: [
    DatePipe
  ],
})
export class SharedModule {}
