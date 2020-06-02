import { NgModule } from "@angular/core";

// Angular Material Imports
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatBadgeModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
})

export class MaterialModule { }
