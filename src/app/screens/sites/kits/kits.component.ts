import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KitsService } from './services/kits.service';
import { map } from 'rxjs/operators';
import { KitsModels } from './models/kits.models';
import { DatePipe } from '@angular/common';
import { Location} from '@angular/common';

@Component({
  selector: 'app-kits',
  templateUrl: './kits.component.html',
  styleUrls: ['./kits.component.scss']
})
export class KitsComponent implements OnInit {

  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre','identificacion', 'tipo','fecha'
  ];

  dataSource!: MatTableDataSource<KitsModels>;
  datePipe = new DatePipe('es-CO');

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  constructor(
    private kitService: KitsService,
    private loc: Location
  ) {}

  ngOnInit(): void {

    // this.kitService.getKitsList()
    // .pipe(
    //   map((res: any) => {
    //     return res.map((item: any) => {
    //       let filtered = {
    //         'nombre': item.nombre,
    //         'cedula': item.cedula,
    //         'entregado': item.entregado,
    //         'fecha': new Date(item.fecha),
    //       };
    //       return filtered;
    //     })
    //   })
    // ).subscribe((data: Array<any>) => {
    //   this.dataSource = new MatTableDataSource(data.reverse());
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.isLoadingResults = false;
    //   this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
    //     return data.nombre.trim().toLowerCase().indexOf(filter) != -1 || data.cedula.trim().toLowerCase().indexOf(filter) != -1 || data.entregado.trim().toLowerCase().indexOf(filter) != -1 ||this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm', 'UTC')?.indexOf(filter) != -1;
    //   }
    // });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  redirect(){
    this.loc.back();
  }

}
