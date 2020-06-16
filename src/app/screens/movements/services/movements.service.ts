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
export class MovementsService {

  constructor(private http: HttpClient) { }

  // GET movements list from DB
  getMovementsList() {
    let url = API_URL + '/movements/getAll';
    return this.http.get(url, { headers });
  }

}
