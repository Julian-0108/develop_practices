import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: "root",
})

export class OfficeService {
  constructor(private http: HttpClient) { }

  async getListOffices():Promise<any>{
    return await this.http
    .get(`${environment.API_SITESAPP}/offices?status=true`)
    .pipe(pluck('payload'))
    .toPromise();
  }

}
