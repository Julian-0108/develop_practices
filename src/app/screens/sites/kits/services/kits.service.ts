import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KitsService {

  constructor(private http: HttpClient) { }

  // GET kits list from DB
  getKitsList() {
     let url = API_URL + '/kit/getKits';
    return this.http.get(url);
  }

}
