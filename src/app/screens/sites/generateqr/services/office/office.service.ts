import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { API_URL } from 'src/environments/environment';


@Injectable({
  providedIn: "root",
})

export class OfficeService {
  constructor(private http: HttpClient) { }

  // GET Office list from DB
  getOfficeList() {
    let resourceUrl = API_URL + "/office";
    return this.http.get(resourceUrl);
  }

  // GET Office by ID
  getOfficeByVenueId(body: string) {
    const BODY = JSON.stringify({ "idSede": body });
    let resourceUrl = API_URL + "/office/getIdSede";
    return this.http.post(resourceUrl, BODY).pipe(map(resp => resp));
  }
}
