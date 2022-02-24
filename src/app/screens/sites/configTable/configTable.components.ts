import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SitesComponent } from './dialogs/sites.component';
import { Tables } from './interfaces/configTable.interface';
import { ConfigTableServices } from './services/configTable.services';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-config-table',
  templateUrl: './configTable.components.html',
  styleUrls: ['./configTable.components.scss'],
})
export class ConfigTableComponents implements OnInit {
  ngOnInit(): void {}
  public informationSites: boolean;

  constructor(private service: ConfigTableServices, private dialog: MatDialog) {
    this.informationSites = false;
  }
  otherIcon!: boolean;
  open: boolean = false;
  help: string = 'help';
  idHistory!: string;
  subtitle: any = '';
  dataSource: MatTableDataSource<Tables | any> = new MatTableDataSource();

  public displayedColumns: string[] = [
    'name',
    'direction',
    'phone',
    'city',
    'creationDate',
    'actualizationDate',
    'status',
    'actions',
  ];

  public table = [
    {
      name: 'Sedes',
      url: 'venues',
      sumary: 'aquí puedes configurar las sedes de la empresa',
      haveTypeField: false,
    },
    {
      name: 'Oficinas',
      url: 'Offices',
      sumary: 'aquí puedes configurar las oficinas',
      haveTypeField: false,
    },
  ];
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyDirectFilter(filterValue: any) {
    this.dataSource.filter = filterValue;
  }
  isOpen() {
    this.open = true;
  }

  getList(url: string) {
    this.table.forEach((tb: any) => {
      if (tb.url == url) {
        this.subtitle = tb.name;
      }
    });
    this.service
      .getListSites(url)
      .then((dataValue) => {
        if (dataValue.length > 0) {
          this.dataSource = new MatTableDataSource(dataValue);
          this.informationSites = true;
        }
      })
      .catch((error) => {
        this.dataSource = new MatTableDataSource();
        this.informationSites = false;
        console.log('error', error);
      });
  }

  openEdit(value: any) {
    console.log(value);
    this.dialog.open(SitesComponent, {
      width: '60%',
      height: '80%',
      data: { dataSite: value },
    });
  }
}
