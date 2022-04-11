import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor(private http: HttpClient) { }


  async postUser(value:any): Promise<any>{
   return await this.http.post(`${environment.API_LOCAL}/users-permission`,value).toPromise();
  }

  async getUser(dni:number):Promise<any>{
    return await this.http.get(`${environment.API_LOCAL}/users-permission/all?dni=${dni}`)
    .pipe(pluck('payload'))
    .toPromise();
  }
}
