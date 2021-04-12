import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Master } from '@shared/interfaces/master.interface';

export interface AcademicEducation {
  _id: string;
  name: string;
  description: string;
  status: boolean;
  type?: string;
  updatedAt: string;
  createdAt: string;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileTemplateService {
  constructor(private httpClient: HttpClient) {}

  async getAllEstudies(): Promise<AcademicEducation[]> {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/studies?status=true`)
      .pipe<AcademicEducation[]>(pluck('payload'))
      .toPromise();
  }
  async getAllAreas(): Promise<AcademicEducation[]> {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/education-area?status=true`)
      .pipe<AcademicEducation[]>(pluck('payload'))
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
  async getAllSecurityResponsabilities(type?: string) {
    if (type) {
      return await this.httpClient
        .get(`${environment.API_MASTER_INFO}/security-responsabilities?status=true&type=${type}`)
        .pipe(pluck('payload'))
        .toPromise();
    }
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
    let data: any = await this.httpClient
      .get(`${environment.API_BASE_PROFILES}/bases-profiles/${idProfile}`)
      .pipe(pluck('payload'))
      .toPromise();

    data.academicEducation = data.academicEducation.map((item: any) => {
      return { education: item._id, name: item.name, area: item.area };
    });

    /* SecurityResponsabilities */
    data.responsabilitiesGroupbyType = {};
    data.securityResponsabilities.forEach((resp: any) => {
      if (!data.responsabilitiesGroupbyType.hasOwnProperty(resp.type)) {
        data.responsabilitiesGroupbyType[resp.type] = data.securityResponsabilities.map(
          (type: any) => {
            if (type.type === resp.type) return type;
          }
        );
      }
    });
    console.log(data);
    return data;
  }
  async updateProfile(id: any, body: any) {
    return await this.httpClient
      .put(`${environment.API_BASE_PROFILES}/bases-profiles/${id}`, body)
      .pipe(pluck('payload'))
      .toPromise();
  }
}
