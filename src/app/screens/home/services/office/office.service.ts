import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { API_URL } from 'src/environments/environment';

const headers = new HttpHeaders({
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
});

@Injectable({
  providedIn: "root",
})
export class OfficeService {
  constructor(private http: HttpClient) { }

  // GET Office list from DB
  getOfficeList() {
    let resourceUrl = API_URL + "/office";
    return this.http.get(resourceUrl, { headers });
  }

  // GET Office by ID
  getOfficeByVenueId(body: string) {
    const BODY = JSON.stringify({ "idSede": body });
    let resourceUrl = API_URL + "/office/getIdSede";
    return this.http.post(resourceUrl, BODY, { headers }).pipe(map(resp => resp));
  }
}
