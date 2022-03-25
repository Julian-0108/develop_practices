import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { API_URL } from 'src/environments/environment';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: "root",
})

export class OfficeService {
  constructor(private http: HttpClient) { }

  async getListOffices(){
    return await this.http
    .get(`${environment.API_SITESAPP}/offices?status=true`)
  }

}
