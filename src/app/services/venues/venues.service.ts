import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({
  providedIn: 'root'
})

export class VenuesService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // GET Venues list from DB
  getVenueList() {
    let url = URL_SERVICES + '/venues';
    return this.http.get(url, { headers });
  }

  // GET Venues by ID
  getVenueById(index: number) {
    let url = URL_SERVICES + '/venues';
    return this.http.get(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
  }

}
