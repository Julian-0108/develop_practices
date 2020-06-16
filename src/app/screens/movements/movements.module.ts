import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementsComponent } from './movements.component';

// material imports
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VenuePipe } from './pipes/venue.pipe';
import { MicrositePipe } from './pipes/microsite.pipe';
import { NamePipe } from './pipes/name.pipe';


@NgModule({
  declarations: [
    MovementsComponent,
    VenuePipe,
    MicrositePipe,
    NamePipe
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,

    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatProgressSpinnerModule
  ]
})
export class MovementsModule { }
