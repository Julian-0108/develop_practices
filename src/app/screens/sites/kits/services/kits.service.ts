import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KitsService {

  constructor(private http: HttpClient) { }

  // GET kits list from DB
    async getKitsList(): Promise<any> {
      return await this.http.get(`${environment.API_SITESAPP}/kit-movements`).pipe(
        map((res: any) => {
          return res?.payload.map((item: any) => {
            let filtered = {
              'name': item.name,
              'idCard': item.dni,
              'type': item.idKit?.name,
              'date': new Date(item.createdAt),
            };
            return filtered;
          })
        })
      ).toPromise();
    }

}
