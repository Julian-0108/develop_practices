import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Search } from '@app/screens/profiles/profile-manage-resumes/interfaces/manege-resumes.interface';
import { Tables } from './interfaces/config-table-dialog';
import { ConfigTableServices } from './services/configTable.services';


@Component({
  selector: 'app-config-table',
  templateUrl: './configTable.components.html',
  styleUrls: ['./configTable.components.scss'],
})
export class ConfigTableComponents implements OnInit {
  ngOnInit(): void {
    // this.getSites();

  }

  constructor(private service:ConfigTableServices) {}
  masterInfoService: any;
  otherIcon!: boolean;
  open: boolean = false;
  help: string = 'help';
  idHistory!: string;
  subtitle: any = '';
  dataSource:  MatTableDataSource<Tables> = new MatTableDataSource();;

 // public configSelected:string='';

  public displayedColumns: string[] = [
    'name',
    'direction',
    'phone',
    'city',
    'creationDate',
    'actualizationDate',
    'status',
    'actions'
  ];

  public readonly table = [
    {
      name: 'Configuracion de sedes',
      url:'venues',
      sumary:
        'aqui puedes configurar las sedes de la empresa',
      haveTypeField: false,
    },
    {name:'oficinas',
    url:'sedes'
  },
  ];


  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  // //   // this.dataSource.filter() = filterValue.trim().toLowerCase();
  // }
  applyFilter(filterValue: any) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyDirectFilter(filterValue: any) {
    this.dataSource.filter = filterValue;
  }
  isOpen() {
    this.open = true;
  }

  getSites(url:string){
    this.service.getDataSites(url)
      .then(dataValue => {
        if(dataValue.length > 0){
          this.dataSource = dataValue;
        }
      }).catch(error => {
        // this.dataSource = [{}];
        console.log('error',error);
      })
  }

}
