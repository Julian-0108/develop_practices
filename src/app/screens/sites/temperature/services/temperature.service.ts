import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  constructor(private http: HttpClient) { }

  // GET temperature list from DB
  getTemperatureList() {
    let url = API_URL + '/temperature/temperaturas';
    return this.http.get(url);
  }
}
