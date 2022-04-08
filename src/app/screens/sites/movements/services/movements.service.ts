import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pluck } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  constructor(private http: HttpClient) { }

  async getMovementsList() {
    return await this.http.get(`${environment.API_SITESAPP}/movements`)
    .pipe(pluck('payload'))
    .toPromise();
  }

}
