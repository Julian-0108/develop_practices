import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Master } from '@shared/interfaces/master.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileTemplateService {
  constructor(private httpClient: HttpClient) {}

  async getAllEstudies() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/studies?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllCertificates() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/courses-certifications?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllKnowledge() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/specific-knowledge?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllFunctions() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/functions?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllTalents() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/skills?status=true&type=Talentos`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllSecurityResponsabilities() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/security-responsabilities?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  historyPreview(id: any) {
    return this.httpClient
      .get(`${environment.API_BASE_PROFILES}/historical-records/${id}`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  historyActions(action: string, idProfile: string, data?: any) {
    if (action === 'get') {
      return this.httpClient
        .get(`${environment.API_BASE_PROFILES}/historical-records?idBaseProfile=${idProfile}`)
        .pipe(pluck('payload'))
        .toPromise();
    } else if (action === 'post') {
      return this.httpClient
        .post(`${environment.API_BASE_PROFILES}/historical-records`, data)
        .pipe(pluck('payload'))
        .toPromise();
    }
  }

  async getData(idProfile: string) {
    return await this.httpClient
      .get(`${environment.API_BASE_PROFILES}/bases-profiles/${idProfile}`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async updateProfile(id: any, body: any) {
    return await this.httpClient
      .put(`${environment.API_BASE_PROFILES}/bases-profiles/${id}`, body)
      .pipe(pluck('payload'))
      .toPromise();
  }
}
