import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import localeCo from '@angular/common/locales/es-CO';

import { KitsRoutingModule } from './kits-routing.module';
import { KitsComponent } from './kits.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

registerLocaleData(localeCo, 'es-Co');

@NgModule({
  declarations: [KitsComponent],
  imports: [
    CommonModule,
    KitsRoutingModule,

    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatCardModule
  ],
})
export class KitsModule { }
