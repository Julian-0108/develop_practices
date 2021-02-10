import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileOptionsService {
  constructor(private httpClient: HttpClient) {}

  getBaseTeams() {
    return this.httpClient
      .get(`${environment.API_MASTER_INFO}/base-teams-categories?status=true&type=EQUIPO_BASE`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  getSubBaseTeams(source: string) {
    console.log(source);
    return this.httpClient
      .get(`${environment.API_MASTER_INFO}/base-teams-categories?status=true&type=subGrupo${source}`)
      .pipe(pluck('payload'))
      .toPromise();
  }

}
