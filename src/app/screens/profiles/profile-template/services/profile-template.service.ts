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
    return [
      {
        name: 'Sistemas',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a0155556',
      },
      {
        name: 'Administración',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a0155557',
      },
      {
        name: 'Gestión Humana',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a0155558',
      },
      {
        name: 'Gerencia',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a0155559',
      },
      {
        name: 'Finanzas',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555510',
      },
      {
        name: 'Otro',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555511',
      },
      {
        name: 'Otro1',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555512',
      },
      {
        name: 'Otro2',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555513',
      },
      {
        name: 'Otro3',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555514',
      },
      {
        name: 'Otro4',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555515',
      },
      {
        name: 'Otro5',
        createdAt: '2021-03-25T21:51:42.741Z',
        description: 'ejemplo',
        status: true,
        updatedAt: '2021-03-25T21:51:42.741Z',
        _id: '605d05ee90d9e441a01555516',
      },
    ];
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
    let data: any = await this.httpClient
      .get(`${environment.API_BASE_PROFILES}/bases-profiles/${idProfile}`)
      .pipe(pluck('payload'))
      .toPromise();
    data[0]['area'] = [
      [
        {
          _id: '605d05ee90d9e441a0155556',
          name: 'Sistemas',
          createdAt: '2021-03-25T21:51:42.741Z',
          description: 'ejemplo',
          status: true,
          updatedAt: '2021-03-25T21:51:42.741Z',
        },
        {
          _id: '605d05ee90d9e441a0155557',
          name: 'Administración',
          createdAt: '2021-03-25T21:51:42.741Z',
          description: 'ejemplo',
          status: true,
          updatedAt: '2021-03-25T21:51:42.741Z',
        },
      ],
      [
        {
          _id: '605d05ee90d9e441a0155558',
          name: 'Gestión Humana',
          createdAt: '2021-03-25T21:51:42.741Z',
          description: 'ejemplo',
          status: true,
          updatedAt: '2021-03-25T21:51:42.741Z'
        },
      ]
    ];
    data[0]['educationAndAreaMerge'] = [];
    // for (let i = 0; i < data[0].education.length; i++) {
    //   // const element = data[0].education[i];
    //   data[0]['educationAndAreaMerge'].push({
    //     education: data[0].education[i],
    //     area: data[0].area[i]
    //   })
    // }
    data[0]['education'].push({
      _id: '605d05ee90d9e441a0155556',
      createdAt: '2021-03-25T21:51:42.741Z',
      description: 'ejemplo',
      name: 'Ingeniero 2',
      status: true,
      type: 'Profesional',
      updatedAt: '2021-03-25T21:51:42.741Z',
    }
    );
    for (let i of data[0].education) {
      data[0]['educationAndAreaMerge'].push({
        education: i._id,
        area: data[0].area[data[0].education.indexOf(i)].map((res: any) => Object({_id: res._id, name: res.name})),
        name: i.name
      });
    }
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
