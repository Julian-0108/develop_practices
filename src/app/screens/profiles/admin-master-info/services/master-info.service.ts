import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { pluck } from "rxjs/operators";
import { Master } from "@shared/interfaces/master.interface";
import { Response } from "@app/shared/interfaces/response.interface";
import { AuthService } from '@app/screens/login/services/auth/auth.service';

@Injectable({
  providedIn: "root",
})
export class MasterInfoService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getData(url: string): Promise<Master[]>{
    return this.http
      .get<Response>(`${environment.API_MUNDO_SETI}/${url}`)
      .pipe(pluck<Response, Master[]>('payload') )
      .toPromise();
  }

  getTypes(param: any): Promise<any>{
    const url = param.name[0].name;
    return this.http
      .get(`${environment.API_MUNDO_SETI}/types?masterReference=${encodeURIComponent(url)}&status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  addRegisterToMaster(url: string, register: any) {
    return this.http.post(`${environment.API_MUNDO_SETI}/${url}`, register).toPromise();
  }

  updateRegisterToMaster(url: string, id: any, register: Master) {
    return this.http.put(`${environment.API_MUNDO_SETI}/${url}/${id}`, register).toPromise();
  }

  addRegisterToMasterWithImages(url: string, register: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
      xhr.open('POST', `${environment.API_MUNDO_SETI}/${url}`);
      const authData: any = this.authService.getToken();
      xhr.setRequestHeader('Authorization', `Bearer ${JSON.parse(authData).token}`);
      xhr.send(register);
    });
  }

  updateToMasterWithImages(url: string, id: any, register: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
      xhr.open('PUT', `${environment.API_MUNDO_SETI}/${url}/${id}`);
      const authData: any = this.authService.getToken();
      xhr.setRequestHeader('Authorization', `Bearer ${JSON.parse(authData).token}`);
      xhr.send(register);
    });
  }
}
