import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({
  providedIn: 'root'
})

export class OfficeService {

  constructor(
    private http: HttpClient,
  ) {}

  // GET Office list from DB
  getOfficeList() {
    let url = URL_SERVICES + '/office';
    return this.http.get(url, { headers });
  }

  // GET Office by ID
  getOfficeByVenueId(index: number) {
    let url = URL_SERVICES + '/office/getIdSede';
    return this.http.post(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
  }

}
