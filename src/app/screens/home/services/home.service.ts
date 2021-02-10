import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient, HttpParams } from '@angular/common/http';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getModules(): Promise<any> {
    return this.http.get(`${environment.API_MASTER_INFO}/modules?type=home&status=true`)
    .pipe(
      pluck('payload')
    )
    .toPromise();
  }

}
