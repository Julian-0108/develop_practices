import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SitesComponent } from './dialogs/sites.component';
import { Tables } from './interfaces/configTable.interface';
import { ConfigTableServices } from './services/configTable.services';
import { MatDialog } from '@angular/material/dialog';
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';

@Component({
  selector: 'app-config-table',
  templateUrl: './configTable.components.html',
  styleUrls: ['./configTable.components.scss'],
})
export class ConfigTableComponents implements OnInit {
  ngOnInit(): void {}
  public informationSites: boolean;
  public informationTables: boolean;
  public add: boolean = false;

  constructor(
    private service: ConfigTableServices,
    private dialog: MatDialog,
    private filter: SearchFilterPipe
  ) {
    this.informationSites = false;
    this.informationTables = true;
  }
  otherIcon!: boolean;
  open: boolean = false;
  help: string = 'help';
  idHistory!: string;
  subtitle: any = '';
  urlUpdate: string = '';
  filterListSities: Array<any> = [];
  filterSities: any = {};
  dataSource: MatTableDataSource<Tables | any> = new MatTableDataSource();
  btnAdd = false;

  public displayedColumns: string[] = [
    'name',
    'nameVenues',
    'direction',
    'phone',
    'city',
    'office',
    'nameOffice',
    'floor',
    'capacity',
    'creationDate',
    'actualizationDate',
    'status',
    'actions',
  ];

  public table = [
    {
      name: 'Sedes',
      url: 'venues',
      sumary: 'Aquí puedes configurar las sedes de la empresa',
      haveTypeField: true,
    },
    {
      name: 'Oficinas',
      url: 'offices',
      sumary: 'Aquí puedes configurar las oficinas',
      haveTypeField: false,
    },
    {
      name: 'Sitios',
      url: 'sites',
      sumary: 'Aquí puedes configurar los sitios',
      haveTypeField: true,
    },
    {
      name: 'Kits',
      url: 'kit',
      sumary: 'Aquí puedes configurar los kits de la empresa',
      haveTypeField: true,
    },
  ];

  applyFilter(value: any, type: string) {
    if (type == 'idVenues.name') {
      const arraySource: any = [];
      this.filterListSities.forEach((valuecompare: any) => {
        if (valuecompare.idVenues.name.toLowerCase().includes(value)) {
          arraySource.push(valuecompare);
        }
      });
      this.dataSource = arraySource;
    } else if (type == 'offices.office') {
      const arraySource: any = [];
      this.filterListSities.forEach((valuecompare: any) => {
        if (valuecompare.offices.office.toLowerCase().includes(value)) {
          arraySource.push(valuecompare);
        }
      });
      this.dataSource = arraySource;
    } else {
      this.filterSities[type] = value;
      this.dataSource = this.filter.transform(this.filterListSities, this.filterSities);
    }
  }

  async getList(url: string) {
    this.table.forEach((tb: any) => {
      if (tb.url == url) {
        this.subtitle = tb.name;
      }
    });
    this.urlUpdate = url;
    this.btnAdd = true;
    await this.service
      .getListSites(url)
      .then((dataValue) => {
        if (dataValue.length > 0) {
          this.filterListSities = dataValue;
          this.dataSource = new MatTableDataSource(dataValue);
          this.informationSites = true;
          this.informationTables = true;
        }
      })
      .catch((error) => {
        this.dataSource = new MatTableDataSource();
        this.informationSites = true;
        this.informationTables = false;
      });
  }
  getDisplayedColumns() {
    switch (this.urlUpdate) {
      case 'venues':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'nameVenues' &&
            el !== 'office' &&
            el !== 'floor' &&
            el !== 'nameOffice' &&
            el !== 'capacity'
        );
      case 'offices':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'name' &&
            el !== 'direction' &&
            el !== 'phone' &&
            el !== 'nameOffice' &&
            el !== 'city'
        );
      case 'sites':
        return this.displayedColumns.filter(
          (el) =>
            el !== 'direction' &&
            el !== 'phone' &&
            el !== 'city' &&
            el !== 'nameVenues' &&
            el !== 'floor' &&
            el !== 'office'
        );
        case 'kit':
          return this.displayedColumns.filter(
            (el) =>
              el !== 'direction' &&
              el !== 'phone' &&
              el !== 'city' &&
              el !== 'nameVenues' &&
              el !== 'floor' &&
              el !== 'capacity'&&
              el !== 'nameOffice' &&
              el !== 'office'
          );
    }
  }

  openEdit(value: any) {
    this.dialog
      .open(SitesComponent, {
        height: '365px',
        width: '55%',
        data: {
          dataSite: value,
          subtitle: this.subtitle,
          add: false,
          url: this.urlUpdate,
          title: `Editar ${this.subtitle}`,
        },
      })
      .afterClosed()
      .toPromise()
      .then((response: boolean) => {
        if (response) {
          this.getList(this.urlUpdate);
        }
      });
  }
  openCreate() {
    this.dialog
      .open(SitesComponent, {
        height: '365px',
        width: '55%',
        data: {
          subtitle: this.subtitle,
          add: true,
          url: this.urlUpdate,
          title: `Agregar ${this.subtitle}`,
        },
      })
      .afterClosed()
      .toPromise()
      .then((response: boolean) => {
        if (response) {
          this.getList(this.urlUpdate);
        }
      });

  }

}
