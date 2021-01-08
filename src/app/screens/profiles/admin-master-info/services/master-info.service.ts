import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { pluck } from "rxjs/operators";
import { Master } from "@shared/interfaces/master.interface";

@Injectable({
  providedIn: "root",
})
export class MasterInfoService {
  constructor(private http: HttpClient) {}

  getData(url: string): Promise<any>{
    return this.http
      .get<Master>(`${environment.API_MUNDO_SETI}/${url}`)
      .pipe( pluck('payload') )
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
      // xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
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
      // xhr.setRequestHeader('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
      xhr.send(register);
    });
  }
}
