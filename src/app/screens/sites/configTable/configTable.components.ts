import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-config-table',
  templateUrl: './configTable.components.html',
  styleUrls: ['./configTable.components.scss'],
})
export class ConfigTableComponents implements OnInit {
  ngOnInit(): void {}
  masterInfoService: any;
  otherIcon!: boolean;
  open: boolean = false;
  help: string = 'help';
  idHistory!: string;
  subtitle: any = '';
  dataSource =new MatTableDataSource(ELEMENT_DATA);

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
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
export interface PeriodicElement {
  name: string,
  direction : string
  phone: number
  city: string
  creationDate: string
  actualizationDate: string
  status : boolean
  actions: string
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name:'Erick', direction:'Villeta Colombia', phone: 3106887373, city:'villeta', creationDate: '20-04-2022', actualizationDate: '10/10/2023', status:true, actions:'edit'},
  {name:'Leo', direction:'Villeta Colombia', phone: 3106887373, city:'villeta', creationDate: '17-02-2022', actualizationDate: '10/10/2023', status:true, actions:'edit'}
];
