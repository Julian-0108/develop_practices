import { map, pluck } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { API_URL } from 'src/environments/environment';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })

export class SitesService {

  constructor(private http: HttpClient) { }

  async getListSites(): Promise<any>{
    return await this.http
    .get(`${environment.API_SITESAPP}/sites?status=true`)
    .pipe(pluck('payload'))
    .toPromise();
  }

}
