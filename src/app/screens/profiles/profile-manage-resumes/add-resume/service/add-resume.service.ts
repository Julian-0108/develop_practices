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
    console.log('Metodo post de addResume',url,register)
    return this.http.post(`${url}`, register).toPromise();
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
}
