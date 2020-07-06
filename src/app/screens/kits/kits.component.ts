import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KitsService } from './services/kits.service';
import { map } from 'rxjs/operators';
import { KitsModels } from './models/kits.models';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.scss']
})
export class KitsComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre', 'cedula', 'entregado', 'fecha'
  ];

  dataSource!: MatTableDataSource<KitsModels>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private kitService: KitsService
  ) {}

  ngOnInit(): void {
    this.getKits();
  }

  getKits() {
    this.kitService.getKitsList().subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.filterPredicate = (order: KitsModels, filter: string) => {
        const transformedFilter = filter.trim().toLowerCase();
        const listAsFlatString = (obj: any): string => {
          let returnVal = '';
          Object.values(obj).forEach((val) => {
            if (typeof val !== 'object') {
              returnVal = returnVal + ' ' + val;
            } else if (val !== null) {
              returnVal = returnVal + ' ' + listAsFlatString(val);
            }
          });
          return returnVal.trim().toLowerCase();
        };
        return listAsFlatString(order).includes(transformedFilter);
      };
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
