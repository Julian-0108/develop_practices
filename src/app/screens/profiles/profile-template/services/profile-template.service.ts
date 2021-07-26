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

  async getAllEstudies(): Promise<Master[]> {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/studies?status=true`)
      .pipe<Master[]>(pluck('payload'))
      .toPromise();
  }

  async getAllAreas(): Promise<Master[]> {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/education-area?status=true`)
      .pipe<Master[]>(pluck('payload'))
      .toPromise();
  }
  async getAllTypes(masterReference?: string | boolean, idType?: string | boolean) {
    if (masterReference) {
      return await this.httpClient
        .get(`${environment.API_MASTER_INFO}/types?status=true&masterReference=${masterReference}`)
        .pipe(pluck('payload'))
        .toPromise();
    }
    if (idType) {
      return await this.httpClient
        .get(`${environment.API_MASTER_INFO}/types?status=true/${idType}`)
        .pipe(pluck('payload'))
        .toPromise();
    }
  }
  changeKeyName(response: any) {
    for (let i of response) {
      i._id = i.id;
    }
  }
  async getAllCertificates(idDomain?: string, type?: string, name?: string) {
    if (idDomain && type) {
      const response: any = await this.httpClient
        .get(
          `${environment.API_MASTER_INFO}/courses-certifications?status=true&idDomain=${idDomain}&type=${type}`
        )
        .pipe(pluck('payload'))
        .toPromise();
      return response;
    }
    if (type) {
      const response: any = await this.httpClient
        .get(`${environment.API_MASTER_INFO}/courses-certifications?status=true&type=${type}`)
        .pipe(pluck('payload'))
        .toPromise();
      return response;
    }
    if (idDomain) {
      const response: any = await this.httpClient
        .get(
          `${environment.API_MASTER_INFO}/courses-certifications?status=true&idDomain=${idDomain}`
        )
        .pipe(pluck('payload'))
        .toPromise();
      return response;
    }
    if (idDomain && type && name) {
      const response: any = await this.httpClient
        .get(
          `${environment.API_MASTER_INFO}/courses-certifications?status=true&idDomain=${idDomain}&type=${type}&name:${name}`
        )
        .pipe(pluck('payload'))
        .toPromise();
      return response;
    } else {
      const response: any = await this.httpClient
        .get(`${environment.API_MASTER_INFO}/courses-certifications?status=true`)
        .pipe(pluck('payload'))
        .toPromise();
      return response;
    }
  }
  async getAllKnowledge() {
    return await this.httpClient
      .get(`${environment.API_MASTER_INFO}/specific-knowledge?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllDomains() {
    let domainList: any = await this.httpClient
      .get(`${environment.API_MASTER_INFO}/domain?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    domainList.forEach((item: any) => {
      item.idDomain = item._id;
      item.nameDomain = item.name;
    });
    return domainList;
  }
  async getAllFunctions(idDomain?: string) {
    return idDomain
      ? await this.httpClient
          .get(`${environment.API_MASTER_INFO}/functions?status=true&idDomain=${idDomain}`)
          .pipe(pluck('payload'))
          .toPromise()
      : await this.httpClient
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

  async historyPreview(id: any) {
    let data: any = await this.httpClient
      .get(`${environment.API_BASE_PROFILES}/historical-records/${id}`)
      .pipe(pluck('payload'))
      .toPromise();

    this.changeKeyName(data.coursesAndCertifications);
    data.academicEducation = data.academicEducation.map((item: any) => {
      return { education: item._id, name: item.name, area: item.area };
    });
    data.rolResponsabilities = data.jobFunctions;
    delete data.jobFunctions;
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
    return data;
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
    this.changeKeyName(data.coursesAndCertifications);
    data.academicEducation = data.academicEducation.map((item: any) => {
      return { _id: item._id, education: item._id, name: item.name, area: item.area };
    });
    data.rolResponsabilities = data.jobFunctions;
    delete data.jobFunctions;
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
    return data;
  }
  async updateProfile(id: any, body: any) {
    return await this.httpClient
      .put(`${environment.API_BASE_PROFILES}/bases-profiles/${id}`, body)
      .pipe(pluck('payload'))
      .toPromise();
  }
  async getAllKnowledgeArea(idDomain?: string) {
    return idDomain
      ? await this.httpClient
          .get(`${environment.API_MASTER_INFO}/syllabi?status=true&idDomain=${idDomain}`)
          .pipe(pluck('payload'))
          .toPromise()
      : await this.httpClient
          .get(`${environment.API_MASTER_INFO}/syllabi?status=true`)
          .pipe(pluck('payload'))
          .toPromise();
  }
  async getAllSpecificKnowledge(idDomain: string, knowledgeArea: string) {
    return await this.httpClient
      .get(
        `${environment.API_MASTER_INFO}/syllabi?status=true&idDomain=${idDomain}&knowledgeArea=${knowledgeArea}`
      )
      .pipe(pluck('payload'))
      .toPromise();
  }

  async getSyllabi(idDomain?: string, knowledgeArea?: string, specificKnowledge?: string) {
    if (idDomain && knowledgeArea && specificKnowledge) {
      return await this.httpClient
        .get(
          `${environment.API_MASTER_INFO}/syllabi?status=true&idDomain=${idDomain}&knowledgeArea=${knowledgeArea.replace('&','%26')}&specificKnowledge=${specificKnowledge.replace('&','%26')}`
        )
        .pipe(pluck('payload'))
        .toPromise();
    }
    /** Con la información que trae del servicio de Sylaby, arma las listas de los filtros
     * de knowledgeArea y specificKnowledge.
     */
    let allLists: any = { knowledgeArea: [], specificKnowledge: [] };
    let response: any = await this.httpClient
      .get(`${environment.API_MASTER_INFO}/syllabi?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
    response.forEach((element: any) => {
      allLists.knowledgeArea.push(element.knowledgeArea);
      allLists.specificKnowledge.push(element.specificKnowledge);
    });
    return allLists;
  }
}
