import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { Search } from '@app/screens/profiles/profile-manage-resumes/interfaces/manege-resumes.interface';
import { ConfigTableServices } from './services/configTable.services';


@Component({
  selector: 'app-config-table',
  templateUrl: './configTable.components.html',
  styleUrls: ['./configTable.components.scss'],
})
export class ConfigTableComponents implements OnInit {
  ngOnInit(): void {
    this.getSites();
  }
  constructor(private service:ConfigTableServices) {}
  masterInfoService: any;
  otherIcon!: boolean;
  open: boolean = false;
  help: string = 'help';
  idHistory!: string;
  subtitle: any = '';
  dataSource: Search[] = [];

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
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
  //   // this.dataSource.filter() = filterValue.trim().toLowerCase();
  }

  getSites(){
    this.service.getDataSites()
      .then(dataValue => {
        if(dataValue.length > 0){
          this.dataSource = dataValue;
        }
      }).catch(error => {
        console.log('error',error);
      })
  }
}
