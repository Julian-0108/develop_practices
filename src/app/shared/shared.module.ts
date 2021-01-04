import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";

// Components Imports
import { ToolbarComponent } from "@shared/components/toolbar/toolbar.component";
import { FooterComponent } from './components/footer/footer.component';

import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [ToolbarComponent, NotificationComponent, FooterComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToolbarComponent,
    MaterialModule,
    FooterComponent,
  ],
  providers: [
    DatePipe
  ],
})
export class SharedModule {}
