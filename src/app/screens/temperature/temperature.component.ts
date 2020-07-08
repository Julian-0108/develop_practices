import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TemperatureService } from './services/temperature.service';
import { TemperatureModels } from './models/temperature.models';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})

export class TemperatureComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre', 'cedula', 'temperatura', 'fecha', 'observaciones'
  ];

  dataSource!: MatTableDataSource<TemperatureModels>;
  datePipe = new DatePipe('es-CO');

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private _temperatureService: TemperatureService
  ) {}

  ngOnInit(): void {

    this._temperatureService.getTemperatureList()
    .pipe(
      map((res: any) => {
        return res.map((item: any) => {
          let filtered = {
            'nombre': item.user_info[0].nombre,
            'cedula': item.cedula,
            'temperatura': item.temperatura,
            'fecha': new Date(item.fecha),
            'observaciones': item.observaciones
          };
          return filtered;
        })
      })
    ).subscribe((data: Array<any>) => {
      console.log(data);
      this.dataSource = new MatTableDataSource(data.reverse());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
      this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
        return data.nombre.trim().toLowerCase().indexOf(filter) != -1 || data.cedula.trim().toLowerCase().indexOf(filter) != -1 || data.temperatura.toString().trim().toLowerCase().indexOf(filter) != -1 || this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm', 'UTC')?.indexOf(filter) != -1;
      }
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
