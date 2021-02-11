import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { pluck } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ManageBaseTeamsService {

  constructor(private http: HttpClient) { }

  getBaseTeams(id: string){
    return this.http.get(`${environment.API_MASTER_INFO}/base-teams-categories?_id=${id}`).pipe( pluck('payload') ).toPromise();
  }

  addProfile(payload: any){
    return this.http.post(`${environment.API_BASE_PROFILES}/bases-profiles`, payload).toPromise()
  }

  updateProfile(id: string, payload: any){
    return this.http.put(`${environment.API_BASE_PROFILES}/bases-profiles/simple/${id}`, payload).toPromise();
  }

}
