import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({ providedIn: 'root' })

export class MicrositesService {

  constructor(private http: HttpClient, private authService: AuthService) {}

  // GET Microsites list from DB
  getMicrositeList() {
    let url = URL_SERVICES + '/microsites';
    return this.http.get(url, { headers });
  }

  // GET Microsites by ID
  getMicrositeById(index: number) {
    let url = URL_SERVICES + '/microsites';
    return this.http.get(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
  }

}
