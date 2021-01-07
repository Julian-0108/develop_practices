import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileOptionsService {
  constructor(private httpClient: HttpClient) {}

  async getBaseTeams() {
    let newResponse: any = [];
    const baseTeams: any = await this.httpClient
      .get(`${environment.API_MUNDO_SETI}/base-teams-categories`)
      .toPromise();
      for (let i of baseTeams.payload) {
        i = {...i, url: '../../../../assets/images/baseTeams_talentoHumano.svg', content: []}
        newResponse = [...newResponse, i]
      }
    return newResponse;
  }
}
