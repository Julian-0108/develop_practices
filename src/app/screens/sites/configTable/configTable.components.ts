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
  filterSities = {
    office: '',
    capacity: '',
    status2: '',
    name: '',
    address: '',
    phoneNumber: '',
    city: '',
    status: '',
    createdAt: '',
    updatedAt: '',
  };
  dataSource: MatTableDataSource<Tables | any> = new MatTableDataSource();
  btnAdd = false;

  public displayedColumns: string[] = [
    'name',
    'office',
    'capacity',
    'createdAt',
    'updatedAt',
    'status2',
    'direction',
    'phone',
    'city',
    'creationDate',
    'actualizationDate',
    'status',
    'actions',
  ];

  getDisplayColumns() {
    console.log(this.urlUpdate);
    switch(this.urlUpdate){
      case 'venues':

        return this.displayedColumns.filter(
          (col)=>
            col !== 'office' &&
            col !== 'capacity' &&
            col !== 'createdAt' &&
            col !== 'updatedAt' &&
            col !== 'status2'  
        );
      case 'sites':
        return this.displayedColumns.filter(
          (col)=>
            col !== 'direction' &&
            col !== 'phone' &&
            col !== 'city' &&
            col !== 'creationDate' &&
            col !== 'actualizationDate' &&
            col !== 'status' 
        );
    }
  }

  hola(){
    console.log(this.getDisplayColumns());
  }

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
  ];

  isOpen() {
    this.open = true;
  }

  applyFilter(value: any, type: any) {
    switch (type) {
      case 'name':
        this.filterSities.name = value;
        break;
      case 'office':
        this.filterSities.office = value;
        break
      case 'address':
        this.filterSities.address = value;
        break;
      case 'phoneNumber':
        this.filterSities.phoneNumber = value;
        break;
      case 'city':
        this.filterSities.city = value;
        break;
      case 'updatedAt':
        this.filterSities.updatedAt = value;
        break;
      case 'createdAt':
        this.filterSities.createdAt = value;
        break;
      case 'status':
        this.filterSities.status = value;
        break;
        case 'capacity':
          this.filterSities.capacity = value;
          break;
    }
    this.dataSource = this.filter.transform(this.filterListSities, this.filterSities);
    console.log(this.filterSities);
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
        console.log('error', error);
      });
  }

  openEdit(value: any) {
    this.dialog
      .open(SitesComponent, {
        width: '60%',
        height: '60%',
        data: {
          dataSite: value,
          subtitle: this.subtitle,
          add: false,
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
        width: '60%',
        height: '60%',
        data: {
          subtitle: this.subtitle,
          add: true,
          url: this.urlUpdate,
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
