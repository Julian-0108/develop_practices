import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MovementsModels } from './models/movements.models';
import { MovementsService } from './services/movements.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})

export class MovementsComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    /*'nombre',*/ 'cedula', 'idTipo', 'idMicrositio', '_id', 'fecha'
  ];

  dataSource!: MatTableDataSource<MovementsModels>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private _movementsService: MovementsService
  ) {}

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements() {
    this._movementsService.getMovementsList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
      console.log(this.dataSource['data'])
      this.dataSource['data'] = response;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


