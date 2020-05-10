import { NgModule } from "@angular/core";

// Angular Material Imports
import {
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
  MatDialogRef,
  MatBadgeModule

} from "@angular/material";

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
