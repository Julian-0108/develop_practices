import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, pluck } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { environment } from '@environments/environment';


@Injectable({
  providedIn: "root",
})

export class KitService {
  constructor(private http: HttpClient) { }

  async getListKit():Promise<any>{
    return await this.http
    .get(`${environment.API_SITESAPP}/kit?status=true`)
    .pipe(pluck('payload'))
    .toPromise();
  }

}
