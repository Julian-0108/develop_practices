import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor() { }

  loadReport(type:string){
    console.log({type:type});
  }
}
