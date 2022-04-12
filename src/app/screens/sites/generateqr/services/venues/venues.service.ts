import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pluck } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VenuesService {

  constructor(
    private http: HttpClient
  ) { }

  async getListVenues(){
    return await this.http
    .get(`${environment.API_SITESAPP}/venues?status=true`)
    .pipe(pluck('payload'))
    .toPromise();
  }

}
