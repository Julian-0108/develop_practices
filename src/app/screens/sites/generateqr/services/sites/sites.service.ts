import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class SitesService {

  constructor(private http: HttpClient) { }

  // GET Sites list from DB
  getSiteList() {
    let url = API_URL + '/microsites';
    return this.http.get(
      url, { observe: 'response' }
    ).pipe(map(resp => resp.body));
  }

  // GET Sites by Office ID
  getSitesByOfficeId(body: string) {
    const BODY = JSON.stringify({ "idOficina": body });
    let url = API_URL + "/microsites";
    return this.http.post(url, BODY).pipe(map(resp => resp));
  }

}
