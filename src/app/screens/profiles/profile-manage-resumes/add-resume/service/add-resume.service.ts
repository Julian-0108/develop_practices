import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@app/screens/login/services/auth/auth.service';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddResumeService {

constructor(private http: HttpClient, private authService: AuthService) {}

addResume(url: string, register: any) {
  return this.http.post(url, register).toPromise();
}

async getDataStudies(): Promise<any>{
  return await this.http
    .get(`${environment.API_MASTER_INFO}/studies?status=true`)
    .pipe( pluck('payload'))
    .toPromise();
}

async getDataDomain():Promise<any>{
  return await this.http
  .get(`${environment.API_MASTER_INFO}/domain?status=true`)
  .pipe(pluck('payload'))
  .toPromise();
}

async getDataSyllabi():Promise<any>{
  return await this.http
  .get(`${environment.API_MASTER_INFO}/syllabi?status=true`)
  .pipe(pluck('payload'))
  .toPromise();
}

async getDataUsers():Promise<any>{
  return await this.http
  .get(`${environment.API_LIFE_HISTORY}/users`)
  .pipe(pluck('payload'))
  .toPromise();
}

async getDataExist(id:number):Promise<any>{
  return await this.http
  .get(`${environment.API_LIFE_HISTORY}/life-story?numberIdentification=${id}`)
  .pipe(pluck('payload'))
  .toPromise();
}

async getDataEducationArea():Promise<any>{
   return await this.http
  .get(`${environment.API_MASTER_INFO}/education-area?status=true`).pipe(pluck('payload')).toPromise();
}

async updateRegister(id:string,data:any):Promise<any>{
  return await  this.http
  .put(`${environment.API_LIFE_HISTORY}/life-story/${id}`,data)
  .toPromise();
}

}
