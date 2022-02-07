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

getDataStudies(): Promise<any>{
  return this.http
    .get(`${environment.API_MASTER_INFO}/studies?status=true`)
    .pipe( pluck('payload'))
    .toPromise();
}

getDataDomain():Promise<any>{
  return this.http
  .get(`${environment.API_MASTER_INFO}/domain?status=true`)
  .pipe(pluck('payload'))
  .toPromise();
}

getDataSyllabi():Promise<any>{
  return this.http
  .get(`${environment.API_MASTER_INFO}/syllabi?status=true`)
  .pipe(pluck('payload'))
  .toPromise();
}

getDataUsers():Promise<any>{
  return this.http
  .get('http://localhost:80/users')
  .pipe(pluck('payload'))
  .toPromise();
}

getDataExist(id:number):Promise<any>{
  return this.http
  .get(`http://localhost:80/life-story?numberIdentification=${id}`)
  .pipe(pluck('payload'))
  .toPromise();
}

getDataEducationArea():Promise<any>{
  return this.http
  .get(`${environment.API_MASTER_INFO}/education-area?status=true`)
  .pipe(pluck('payload'))
  .toPromise();
}

updateRegister(id:string,data:any):Promise<any>{
  return this.http
  .put(`http://localhost:80/life-story/${id}`,data)
  .toPromise();
}

}
