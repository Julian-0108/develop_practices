import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface KitsData {
  cedula: string;
  nombre: string;
  entregado: string;
  fecha: string;
}

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.scss']
})
export class KitsComponent implements OnInit {

  displayedColumns: string[] = [
    'cedula', 'nombre', 'entregado', 'fecha'
  ];

  TABLE_DATA: KitsData[] = [
    {
      cedula: "1037668390",
      nombre: "UPEGUI BORJA MATEO",
      entregado: "SI",
      fecha: "2020-05-15T18:27:33.422Z"
    },
    {
      cedula: "8063471",
      nombre: "VASQUEZ GIRALDO DONCEY",
      entregado: "SI",
      fecha: "2020-05-16T18:34:49.553Z"
    }
  ];

  dataSource!: MatTableDataSource<KitsData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor() {
    this.dataSource = new MatTableDataSource(this.TABLE_DATA);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // getKits

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
