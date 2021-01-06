import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { pluck } from "rxjs/operators";
import { Master } from "../interfaces/master.interface";

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

  addRegisterToMaster(url: string, register: Master) {
    return this.http.post(`${environment.API_MUNDO_SETI}/${url}`, register).toPromise();
  }

  updateRegisterToMaster(url: string, register: Master) {
    return this.http.put(`${environment.API_MUNDO_SETI}/${url}/${register._id}`, register).toPromise();
  }
}
