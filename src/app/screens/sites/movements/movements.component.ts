import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
// import { MovementsModels } from './models/movements.models';
// import { MovementsService } from './services/movements.service';
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
  subtitle = 'Reporte de movimientos';

  tipos = ['Entrada','Salida'];
  filterKeys:any={};
  infoData:any=[];
  venues:any[]=[];


  isLoadingResults = true;
  displayedColumns: string[] = [
    'nombre', 'tipo', 'micrositio', 'sede', 'fecha'
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

  type= new FormControl(null);
  name= new FormControl(null);
  microsite= new FormControl(null);
  campus= new FormControl(null);

  // dataFilter: any[] = [];

  constructor(
    // private _movementsService: MovementsService,
    private searchFilter: SearchFilterPipe,
    private configTable: ConfigTableServices
  ) { }

  ngOnInit(): void {

    // this._movementsService.getMovementsList()
    // .pipe(
    //   map((res: any) => {
    //     return res.map((item: any) => {
    //       const filtered = {
    //         nombre: item.user_info[0].nombre,
    //         tipo: item.idTipo,
    //         micrositio: item.objOficina.nombre,
    //         sede: item.info_sede[0].nombre,
    //         fecha: new Date(item.fecha),
    //       };
    //       return filtered;
    //     })
    //   })
    // ).subscribe((data: Array<any>) => {
    //   this.dataSource = new MatTableDataSource(data.reverse());
    //   this.infoData = data.reverse();
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    //   this.isLoadingResults = false;
    //   this.dataSource.filterPredicate = (data: any, filter: string): boolean => {
    //     return data.nombre.trim().toLowerCase().indexOf(filter) !== -1 || data.tipo.trim().toLowerCase().indexOf(filter) !== -1
    //     || data.micrositio.trim().toLowerCase().indexOf(filter) !== -1 || data.sede.trim().toLowerCase().indexOf(filter) !== -1
    //     || this.datePipe.transform(data.fecha, 'dd/MM/yyyy HH:mm', 'UTC')?.indexOf(filter) !== -1;
    //   }
    // });

    this.getVenues();
  }

  async getVenues(){
    await this.configTable.getListSites('venues')
    .then(dataValue => {
      if(dataValue.length > 0){
        this.venues = dataValue;
      }
    })
  }

  resetInputs(){
    this.type.setValue(null);
    this.name.setValue(null);
    this.microsite.setValue(null);
    this.campus.setValue(null);
  }

  async filterData(value?:any,type?:string){

    console.log(this.formFilterHistory.value)

    if(value != null && type != null){
      this.filterKeys[type] = value;
    }

    if(this.formFilterHistory.get('startDate')?.value === null && this.formFilterHistory.get('endDate')?.value === null ){
      this.dataSource = new MatTableDataSource(await this.searchFilter.transform(this.infoData,this.filterKeys));
    }else if(this.formFilterHistory.get('startDate')?.value != null && this.formFilterHistory.get('endDate')?.value === null){
      await this.filterDateStart({value:this.formFilterHistory.get('startDate')?.value});
      console.log('estos son los datos con el rango filtrado',this.dataSource.data)
      this.dataSource= new MatTableDataSource(await this.searchFilter.transform(this.dataSource.data,this.filterKeys));
      console.log('filtro',this.searchFilter.transform(this.dataSource.data,this.filterKeys))
    }else if(this.formFilterHistory.get('startDate')?.value != null && this.formFilterHistory.get('endDate')?.value != null){
      await this.filterDateEnd({value:this.formFilterHistory.get('endDate')?.value});
      console.log('estos son los datos con el rango filtrado fecha fin',this.dataSource.data)
      this.dataSource= new MatTableDataSource(await this.searchFilter.transform(this.dataSource.data,this.filterKeys));
      console.log('filtro endDate',this.searchFilter.transform(this.dataSource.data,this.filterKeys))
    }
  }


  async filterDateStart(event:any,type:any=null){
    this.minDate=new Date(event.value);
    this.dataSource=new MatTableDataSource(await this.onSelectStartDate(event));
    // this.filterData();
  }

  async filterDateEnd(event:any,type:any=null){
    this.dataSource=new MatTableDataSource(await this.onSelectEndDate(event));
  }

  onSelectStartDate(event: any) {
    console.log("entreeeeeeeeeeeee",this.infoData)
    const startDate = moment(event.value).format('YYYY-MM-DD');
    const endDate =
      this.formFilterHistory.value.endDate === null
        ? moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
        : moment(this.formFilterHistory.value.endDate).format('YYYY-MM-DD HH:mm:ss');
    // if(this.filterKeys !== {}){
    //   return this.dataSource.data.filter(
    //     (item: any) =>
    //       moment(item.fecha).isSameOrAfter(startDate) &&
    //       moment(item.fecha).isSameOrBefore(endDate)
    //   );
    // }else{
      return this.infoData.filter(
        (item: any) =>
          moment(item.fecha).isSameOrAfter(startDate) &&
          moment(item.fecha).isSameOrBefore(endDate)
      );
    // }
  }

  onSelectEndDate(event: any) {
    const endDate = moment(event.value).add('hour',23).add('minutes',59).add('seconds',59).format('YYYY-MM-DD HH:mm:ss');
    const startDate = moment(this.formFilterHistory.value.startDate).format('YYYY-MM-DD HH:mm:ss');
    return this.infoData.filter(
      (item: any) =>
        moment(item.fecha).isSameOrAfter(startDate) &&
        moment(item.fecha).isSameOrBefore(endDate)
    );
  }

  nameFile():string{
    const date = new Date();
    const format = {
      dd: date.getDate(),
      mm: date.getMonth() + 1,
      yyyy: date.getFullYear()
    }
    return (`Movimientos ${format.dd}/${format.mm}/${format.yyyy}`)
  }

  dat(){
    console.log('minDate',this.minDate);
    console.log('maxDate',this.maxDate);
  }

}


