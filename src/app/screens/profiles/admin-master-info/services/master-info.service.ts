import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';
import { Master } from '@shared/interfaces/master.interface';
import { Response } from '@app/shared/interfaces/response.interface';
import { AuthService } from '@app/screens/login/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MasterInfoService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getData(url: string, id?: string): Promise<Master[]> {
    return this.http
      .get<Response>(
        id ? `${environment.API_MASTER_INFO}/${url}/${id}` : `${environment.API_MASTER_INFO}/${url}`
      )
      .pipe(pluck<Response, Master[]>('payload'))
      .toPromise();
  }

  async getSyllabiLists(idDomain: string, knowledgeArea?: string, specificKnowledge?: string) {
    return idDomain && knowledgeArea && specificKnowledge
      ? await this.http
          .get(
            `${environment.API_MASTER_INFO}/syllabi?status=true&idDomain=${idDomain}&knowledgeArea=${knowledgeArea}&specificKnowledge=${specificKnowledge}`
          )
          .pipe(pluck('payload'))
          .toPromise()
      : idDomain && knowledgeArea
      ? await this.http
          .get(
            `${environment.API_MASTER_INFO}/syllabi?status=true&idDomain=${idDomain}&knowledgeArea=${knowledgeArea}`
          )
          .pipe(pluck('payload'))
          .toPromise()
      : await this.http
          .get(`${environment.API_MASTER_INFO}/syllabi?status=true&idDomain=${idDomain}`)
          .pipe(pluck('payload'))
          .toPromise();
  }

  getTypes(param: any): Promise<any> {
    const url = param.name[0].name;
    return this.http
      .get(
        `${environment.API_MASTER_INFO}/types?masterReference=${encodeURIComponent(
          url
        )}&status=true`
      )
      .pipe(pluck('payload'))
      .toPromise();
  }

  getSkills() {
    return this.http
      .get(
        `${environment.API_MASTER_INFO}/base-teams-categories?status=true&type=Habilidad&submenu=true`
      )
      .pipe(pluck('payload'))
      .toPromise();
  }

  async getDomains() {
    return await this.http
      .get(`${environment.API_MASTER_INFO}/domain?status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }

  addRegisterToMaster(url: string, register: any) {
    return this.http.post(`${environment.API_MASTER_INFO}/${url}`, register).toPromise();
  }

  updateRegisterToMaster(url: string, id: any, register: Master) {
    return this.http.put(`${environment.API_MASTER_INFO}/${url}/${id}`, register).toPromise();
  }

  addRegisterToMasterWithImages(url: string, register: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
      xhr.open('POST', `${environment.API_MASTER_INFO}/${url}`);
      const authData: any = this.authService.getToken();
      xhr.setRequestHeader('Authorization', `Bearer ${JSON.parse(authData).token}`);
      xhr.send(register);
    });
  }

  updateToMasterWithImages(url: string, id: any, register: any) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
      xhr.open('PUT', `${environment.API_MASTER_INFO}/${url}/${id}`);
      const authData: any = this.authService.getToken();
      xhr.setRequestHeader('Authorization', `Bearer ${JSON.parse(authData).token}`);
      xhr.send(register);
    });
  }

  async getDomain(id: string) {
    return await this.http
      .get(`${environment.API_MASTER_INFO}/domain/${id}`)
      .pipe(pluck('payload'))
      .toPromise();
  }
}
