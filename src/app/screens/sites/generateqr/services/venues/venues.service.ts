import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VenuesService {

  constructor(
    private http: HttpClient
  ) { }

  // GET Venues list from DB
  getVenueList() {
    let url = API_URL + '/venues';
    return this.http.get(url);
  }

  // GET Venues by ID
  getVenueById(index: number) {
    let url = API_URL + '/venues';
    return this.http.get(url, { observe: 'response' }).pipe(map(resp => resp.body));
  }

}
