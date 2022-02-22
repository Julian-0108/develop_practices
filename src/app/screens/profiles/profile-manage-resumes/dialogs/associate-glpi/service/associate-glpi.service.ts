import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssociateGlpiService {

  constructor(private http: HttpClient) { }

  async getCasesGlpi():Promise<any>{
    return await this.http
      .get(`${environment.API_REQUISITIONS}/cases`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  async getInfoCasesGlpi(case_number:number):Promise<any>{
    return await this.http
      .get(`${environment.API_REQUISITIONS}/cases/${case_number}`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  async saveCase(data:any): Promise<any>{
    return await this.http
    .post(`${environment.API_REQUISITIONS}/requisition-case`,data).toPromise();
  }
}
