import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { FlexModule } from '@angular/flex-layout';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



const materialComponents = [
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRippleModule,
    MatSnackBarModule,
    FlexModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatMenuModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatTableModule,
    ReactiveFormsModule,
    MatButtonToggleModule
];

@NgModule({
    imports: [materialComponents],
    exports: [materialComponents],
    providers: [ {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }]
  })
  export class MaterialModule {}
