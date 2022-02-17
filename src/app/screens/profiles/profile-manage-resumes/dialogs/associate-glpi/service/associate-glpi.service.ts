import { Injectable, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssociateGlpiService {

  constructor(private http: HttpClient) { }

  async getCasesGlpi():Promise<any>{
    return await this.http
      .get('http://localhost:90/cases')
      .pipe(pluck('payload'))
      .toPromise();
  }

  async getInfoCasesGlpi(case_number:number):Promise<any>{
    return await this.http
      .get(`http://localhost:90/cases/${case_number}`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  async saveCase(data:any): Promise<any>{
    return await this.http
    .post('http://localhost:90/requisition-case',data).toPromise();
  }
}
