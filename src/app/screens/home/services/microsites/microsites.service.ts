import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { URL_SERVICES } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/screens/login/services/auth/auth.service';

const headers = new HttpHeaders({
   'Content-Type': 'application/json',
   'Access-Control-Allow-Origin': '*',
});

@Injectable({ providedIn: 'root' })

export class MicrositesService {

   constructor(private http: HttpClient) { }

   // GET Microsites list from DB
   getMicrositeList() {
      let url = URL_SERVICES + '/microsites';
      return this.http.get(url, { headers, observe: 'response' }).pipe(map(resp => resp.body));
   }

   // GET Microsites by Office ID
   getMicrositesByOfficeId(body: string) {
      const BODY = JSON.stringify({ "idOficina": body });
      let url = URL_SERVICES + "/microsites";
      return this.http
         .post(url, BODY, { headers })
         .pipe(map(resp => resp));
   }

}
