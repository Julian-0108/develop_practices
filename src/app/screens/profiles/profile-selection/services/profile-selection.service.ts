import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { pluck } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileSelectionService {

  constructor(private http: HttpClient) { }

  getItemsSelection(): Promise<any>{
    return this.http
      .get(`${environment.API_MASTER_INFO}/modules?type=profile-selection&status=true`)
      .pipe(pluck('payload'))
      .toPromise();
  }
}
