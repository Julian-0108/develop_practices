import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({ providedIn: 'root' })

export class SitesService {

  constructor(private http: HttpClient) { }

  // GET Sites list from DB
  getMicrositeList() {
    let url = URL_SERVICES + '/sites';
    return this.http.get(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
  }

  // GET Sites by Office ID
  getSitesByOfficeId(body: string) {
    const BODY = JSON.stringify({ "idOficina": body });
    let url = URL_SERVICES + "/sites";
    return this.http.post(url, BODY, { headers }).pipe(map(resp => resp));
  }

}
