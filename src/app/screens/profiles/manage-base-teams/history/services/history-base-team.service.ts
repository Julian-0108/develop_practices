import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryBaseTeamsService {

  constructor(private httpClient: HttpClient) { }
  async hitoryActionsManageBaseProfiles(action: string, idProfile: string, data?: any) {
    console.log(data);
    if (action === 'get') {
      return this.httpClient
        .get(`${environment.API_BASE_PROFILES}/historical-profiles?idProfile=${idProfile}`)
        .pipe(pluck('payload'))
        .toPromise();
    } else if (action === 'post') {
      return this.httpClient
        .post(`${environment.API_BASE_PROFILES}/historical-profiles`, data)
        .pipe(pluck('payload'))
        .toPromise();
    }
  }

  getAndPostBaseTeams(action: string, idProfile: string, data?: any) {

  }
}
