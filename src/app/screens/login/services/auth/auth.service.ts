import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

interface userData {
  username: string;
  password: string;
}
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly NAME_LOCAL_DATA = 'MSauthData';
  constructor(private http: HttpClient) {}

  login({ username, password }: userData) {
    const authData = btoa(`${username}:${password}`);
    const headers = new HttpHeaders({
      Authorization: `Basic ${authData}`,
    });
    return this.http
      .post<Response>(`${environment.API_SECURITY}/auth/login`, null, { headers })
      .pipe(
        map((response: any) => {
          localStorage.setItem(
            this.NAME_LOCAL_DATA,
            JSON.stringify({ user: response.payload.profile, token: response.payload.token })
          );
        })
      )
      .toPromise();
  }

  isLoggedIn(): boolean {
    const authData: any =  this.getToken();

    if (authData) {
      const token: any = JSON.parse(atob(JSON.parse(authData).token.split('.')[1]));
      return Math.floor(new Date().getTime() / 1000) < token.exp;
    }

    return false;
  }

  getToken(): string | null {
    return localStorage.getItem(this.NAME_LOCAL_DATA);
  }

  logout(): void {
    localStorage.removeItem(this.NAME_LOCAL_DATA);
  }
}
