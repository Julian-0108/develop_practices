import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageBaseTeamsService {

  constructor(private http: HttpClient) { }

  getBaseTeams(id: number){
    return this.http.get(`${environment.API_MUNDO_SETI}/base-teams-categories?_id=${id}`).pipe( pluck('payload') ).toPromise();
  }

  getMasterCoursesCertifications(){
    return this.http.get(`${environment.API_MUNDO_SETI}/courses-certifications`).pipe( pluck('payload') ).toPromise();
  }

  getMasterSpecificKnowledge(){
    return this.http.get(`${environment.API_MUNDO_SETI}/specific-knowledge`).pipe(pluck('payload')).toPromise();
  }

}
