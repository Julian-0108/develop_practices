import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Tables } from '../../../../shared/interfaces/profile-competences.interface';

@Injectable({
  providedIn: 'root',
})
export class ConfigTableServices {
  constructor(private http: HttpClient) {}

  async getListSites(url: string): Promise<any> {
    return await this.http
      .get(`${environment.API_SITESAPP}/${url}`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  async updateDataSites(url: string, _id:any, dataUp: any): Promise<any> {
    return await this.http
      .put(`${environment.API_SITESAPP}/${url}/${_id}`, dataUp)
       .toPromise();
  }

  async addDataSites(url:string, register:any): Promise<any> {
    return await this.http
      .post(`${environment.API_SITESAPP}/${url}`, register)
      .toPromise();
  }
}
