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
      .get(`${environment.API_MASTER_INFO}/base-teams-categories?status=true&type=Habilidad`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  getSubBaseTeams(idParent: string) {
    return this.httpClient
      .get(
        `${environment.API_MASTER_INFO}/base-teams-categories?status=true&type=Subgrupo&idParent=${idParent}`
      )
      .pipe(pluck('payload'))
      .toPromise();
  }
}
