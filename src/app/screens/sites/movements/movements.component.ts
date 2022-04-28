import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { MovementsModels } from './models/movements.models';
import { MovementsService } from './services/movements.service';
import { ConfigTableServices } from '../configTable/services/configTable.services';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import moment from 'moment';
import { Type } from '../../profiles/admin-master-info/master-info/interfaces.interface';
import { SearchFilterPipe } from '@app/shared/pipes/Search-Filter.pipe';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.scss']
})

export class MovementsComponent implements OnInit {

  title = 'Movimientos';
  subtitle = 'Reporte de Movimientos';

  tipos = ['Entrada','Salida'];
  filterKeys:any={};
  infoData:any=[];
  venues:any[]=[];


  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre','identificacion', 'tipo', 'micrositio', 'sede', 'fecha'
  ];
  dataSource!: MatTableDataSource<Object>;
  datePipe = new DatePipe('es-CO');

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild(MatSort, { static: true, read: MatSort }) sort!: MatSort

  maxDate:Date=new Date();
  minDate!:Date;

  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  name= new FormControl(null);
  dni = new FormControl(null)
  type= new FormControl(null);
  microsite= new FormControl(null);
  campus= new FormControl(null);

  // dataFilter: any[] = [];

  constructor(
    private _movementsService: MovementsService,
    private searchFilter: SearchFilterPipe,
    private configTable: ConfigTableServices
  ) { }

  ngOnInit(): void {
    this.movementsList();
    this.getVenues();
  }

  async movementsList(){
    await this._movementsService.getMovementsList()
    .then((value:any) => {
      this.dataSource = new MatTableDataSource(value);
      this.infoData = value;
    });
  }

  async getVenues(){
    await this.configTable.getListSites('venues')
    .then(dataValue => {
      if(dataValue.length > 0){
        this.venues = dataValue;
      }
    })
  }

  async filterData(value?:any,type?:string){

    if(value != null && type != null){
      this.filterKeys[type] = value;
    }

    if(this.formFilterHistory.get('startDate')?.value === null && this.formFilterHistory.get('endDate')?.value === null ){
      this.dataSource = new MatTableDataSource(await this.searchFilter.transform(this.infoData,this.filterKeys));
    }else if(this.formFilterHistory.get('startDate')?.value != null && this.formFilterHistory.get('endDate')?.value === null){
      await this.filterDateStart({value:this.formFilterHistory.get('startDate')?.value});
      this.dataSource= new MatTableDataSource(await this.searchFilter.transform(this.dataSource.data,this.filterKeys));
    }else if(this.formFilterHistory.get('startDate')?.value != null && this.formFilterHistory.get('endDate')?.value != null){
      await this.filterDateEnd({value:this.formFilterHistory.get('endDate')?.value});
      this.dataSource= new MatTableDataSource(await this.searchFilter.transform(this.dataSource.data,this.filterKeys));
    }
  }


  async filterDateStart(event:any,type:any=null){
    this.minDate=new Date(event.value);
    this.dataSource=new MatTableDataSource(await this.onSelectStartDate(event));
  }

  async filterDateEnd(event:any,type:any=null){
    this.dataSource=new MatTableDataSource(await this.onSelectEndDate(event));
  }

  onSelectStartDate(event: any) {
    const startDate = moment(event.value).format('YYYY-MM-DD');
    const endDate =
      this.formFilterHistory.value.endDate === null
        ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        : moment(this.formFilterHistory.value.endDate).add('hour', 23).add('minutes', 59).add('seconds', 59).format('YYYY-MM-DD HH:mm:ss');
      return this.infoData.filter(
        (item: any) =>
          moment(item.createdAt).isSameOrAfter(startDate) &&
          moment(item.createdAt).isSameOrBefore(endDate)
      );
    // }
  }

  onSelectEndDate(event: any) {
    const endDate = moment(event.value).add('hour',23).add('minutes',59).add('seconds',59).format('YYYY-MM-DD HH:mm:ss');
    const startDate = moment(this.formFilterHistory.value.startDate).format('YYYY-MM-DD HH:mm:ss');
    return this.infoData.filter(
      (item: any) =>
        moment(item.createdAt).isSameOrAfter(startDate) &&
        moment(item.createdAt).isSameOrBefore(endDate)
    );
  }

  nameFile():string{
    const date = new Date();
    const format = {
      dd: date.getDate(),
      mm: date.getMonth() + 1,
      yyyy: date.getFullYear()
    }
    return (`Movimientos ${format.dd}-${format.mm}-${format.yyyy}`)
  }

}


