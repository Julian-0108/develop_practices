import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
});

@Injectable({
  providedIn: 'root'
})
export class KitsService {

  constructor(private http: HttpClient) { }

  // GET kits list from DB
  getKitsList() {
    let url = API_URL + '/kit/getKits';
    return this.http.get(url, { headers });
  }

}
