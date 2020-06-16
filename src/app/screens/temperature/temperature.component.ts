import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TemperatureService } from './services/temperature.service';
import { TemperatureModels } from './models/temperature.models';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})

export class TemperatureComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre', 'cedula', 'temperatura', 'fecha'
  ];

  dataSource!: MatTableDataSource<TemperatureModels>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private temperatureService: TemperatureService
  ) {}

  ngOnInit(): void {
    this.getMovements();
  }

  getMovements() {
    this.temperatureService.getTemperatureList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoadingResults = false;
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
