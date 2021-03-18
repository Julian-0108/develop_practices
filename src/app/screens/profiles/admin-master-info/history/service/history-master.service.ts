import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryMastersService {

  constructor(private httpClient: HttpClient) { }

  async hitoryActionsAdminMaster(action: string, idProfile: string, data?: any) {
    console.log(data);
    if (action === 'get') {
      return this.httpClient
        .get(`${environment.API_MASTER_INFO}/historical-master?idMaster=${idProfile}`)
        .pipe(pluck('payload'))
        .toPromise();
    } else if (action === 'post') {
      return this.httpClient
        .post(`${environment.API_MASTER_INFO}/historical-master`, data)
        .pipe(pluck('payload'))
        .toPromise();
    }
  }
}
