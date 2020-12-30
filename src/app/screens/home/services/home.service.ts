import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getBasesTeams(): Promise<any> {
    return this.http.get(`${environment.API_MUNDO_SETI}/baseTeamsCategories`).toPromise();
  }

}
