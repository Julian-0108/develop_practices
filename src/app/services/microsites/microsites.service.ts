import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

const headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
});

@Injectable({ providedIn: 'root' })

export class MicrositesService {

   constructor(private http: HttpClient, private authService: AuthService) { }

   // GET Microsites list from DB
   getMicrositeList() {
      let url = apiUrl + '/microsites';
      return this.http.get(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
   }

   // GET Microsites by Office ID
   getMicrositesByOfficeId(body: string) {
      const BODY = JSON.stringify({ "idOficina": body });
      let url = apiUrl + "/microsites";
      return this.http
         .post(url, BODY, { headers })
         .pipe(map(resp => resp));
   }

}
