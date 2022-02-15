import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileManageResumesService {

  constructor(private http: HttpClient) { }


  async getDataHvs():Promise<any>{
    return await this.http
    .get('http://localhost:80/life-story')
    .pipe(pluck('payload'))
    .toPromise();
  }
}
