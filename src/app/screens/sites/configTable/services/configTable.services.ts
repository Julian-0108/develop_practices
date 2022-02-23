import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigTableServices {

  constructor(private http: HttpClient) { }


  async getListSites(url:string):Promise<any>{
    return await this.http
    .get(`${environment.API_CONFIGTABLE}/${url}`)
    .pipe(pluck('payload'))
    .toPromise()
  }
}
