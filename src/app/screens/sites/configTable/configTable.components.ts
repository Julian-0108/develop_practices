import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Search } from '@app/screens/profiles/profile-manage-resumes/interfaces/manege-resumes.interface';
import { Tables } from './interfaces/configTable.interface';
import { ConfigTableServices } from './services/configTable.services';

@Component({
  selector: 'app-config-table',
  templateUrl: './configTable.components.html',
  styleUrls: ['./configTable.components.scss'],
})
export class ConfigTableComponents implements OnInit {
  ngOnInit(): void {}

  constructor(private service: ConfigTableServices) {}
  masterInfoService: any;
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

  public readonly table = [
    {
      name: 'Configuracion de sedes',
      url: 'venues',
      sumary: 'aqui puedes configurar las sedes de la empresa',
      haveTypeField: false,
    },
    { name: 'oficinas', url: 'Oficinas' },
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
    this.service
      .getListSites(url)
      .then((dataValue) => {
        if (dataValue.length > 0) {
          this.dataSource = new MatTableDataSource(dataValue);
        }
      })
      .catch((error) => {
        this.dataSource= new MatTableDataSource()
        console.log('error', error);
      });
  }
}
