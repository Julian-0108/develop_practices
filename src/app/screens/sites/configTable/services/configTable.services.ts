import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigTableServices {

  constructor(private http: HttpClient) { }


  async getDataSites(url:string):Promise<any>{
    return await this.http
    .get(`http://localhost:80/${url}`)
    .pipe(pluck('payload'))
    .toPromise()
  }
}
