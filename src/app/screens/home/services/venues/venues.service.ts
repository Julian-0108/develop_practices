import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({
  providedIn: 'root'
})

export class VenuesService {

  constructor(
    private http: HttpClient
  ) { }

  // GET Venues list from DB
  getVenueList() {
    let url = API_URL + '/venues';
    return this.http.get(url, { headers });
  }

  // GET Venues by ID
  getVenueById(index: number) {
    let url = API_URL + '/venues';
    return this.http.get(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
  }

}
