import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private resource = '/user';
  public token = '';

  constructor(
    private http: HttpClient,
  ) { }

  login(username: string, password: string) {
    let resourceUrl = API_URL + this.resource;
    let body = JSON.stringify({ username, password });
    let headers: HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post<any>(resourceUrl, body, { headers }).pipe(map(user => {
      localStorage.setItem('authData', JSON.stringify(user));
      this.token = user;
    }));
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken(): string | null {
    let authData = JSON.parse(localStorage.getItem('authData') || '{}');
    return authData == null ? undefined : authData.token;
  }

}
