import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileManageResumesService {

  constructor(private http: HttpClient) { }


  async getDataHvs():Promise<any>{
    return await this.http
    .get(`${environment.API_LIFE_HISTORY}/life-story`)
    .pipe(pluck('payload'))
    .toPromise();
  }
}
