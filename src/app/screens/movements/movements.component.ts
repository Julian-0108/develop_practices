import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MovementsModels } from './models/movements.models';
import { MovementsService } from './services/movements.service';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})

export class MovementsComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre', 'tipo', 'micrositio', 'sede', 'fecha'
  ];
  dataSource!: MatTableDataSource<Object>;
  datePipe = new DatePipe('es-CO');

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private _movementsService: MovementsService
  ) { }

  ngOnInit(): void {

    this._movementsService.getMovementsList()
    .pipe(
      map((res: any) => {
        return res.map((item: any) => {
          let filtered = {
            'nombre': item.user_info[0].nombre,
            'tipo': item.idTipo,
            'micrositio': item.objOficina.nombre,
            'sede': item.info_sede[0].nombre,
            'fecha': new Date(item.fecha),
          };
          return filtered;
        })
      })
    ).subscribe((data: Array<any>) => {
      this.dataSource = new MatTableDataSource(data.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
      this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
        return data.nombre.trim().toLowerCase().indexOf(filter) != -1 || data.tipo.trim().toLowerCase().indexOf(filter) != -1 || data.micrositio.trim().toLowerCase().indexOf(filter) != -1 || data.sede.trim().toLowerCase().indexOf(filter) != -1 || this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm', 'UTC')?.indexOf(filter) != -1;
      }
    });

  }

  applyFilter(event: Event) {
    const filterValue: String = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


