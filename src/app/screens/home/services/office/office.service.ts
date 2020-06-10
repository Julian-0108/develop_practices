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
    let url = API_URL + "/office";
    return this.http.get(url, { headers });
  }

  // GET Office by ID
  getOfficeByVenueId(body: string) {
    const BODY = JSON.stringify({ "idSede": body });
    let url = API_URL + "/office/getIdSede";
    return this.http.post(url, BODY, { headers }).pipe(map(resp => resp));
  }
}
