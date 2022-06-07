import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  async loadReport(type:string):Promise<any>{
    return await this.http.post(`${environment.API_MEMBERPROFILE}/reports`,{type}).pipe(pluck('payload')).pipe(pluck('result')).toPromise();
  }
}
