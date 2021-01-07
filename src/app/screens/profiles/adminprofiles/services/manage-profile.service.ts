import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { pluck } from "rxjs/operators";


@Injectable({
  providedIn: "root",
})
export class ManageProfileService {
  constructor(private http: HttpClient) {}

  getData(): Promise<any>{
    return this.http
      .get(`${environment.API_MUNDO_SETI}/modules?type=manage-profiles`)
      .pipe( pluck('payload') )
      .toPromise();
  }

}
