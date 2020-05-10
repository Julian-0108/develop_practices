import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from "../../config/config";

import { UserModels } from '../../models/user.models';

const headers = new HttpHeaders({
  "Content-Type": "application/json",
});

@Injectable({ providedIn: 'root' })

export class AuthService {

  private userLoggedIn = new BehaviorSubject(false);

  private resource = '/user';

  constructor(private http: HttpClient) { }

  public token: any = '';

  login(username: string, password: string) {
    let url = URL_SERVICES + this.resource;
    let body = JSON.stringify({ username, password });
    return this.http.post<any>(url, body, { headers }).pipe(map(user => {
      localStorage.setItem('authData', JSON.stringify(user));
      this.token = user;
    }));
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    let authData = JSON.parse(localStorage.getItem('authData'));
    return authData == null ? undefined : authData.token;
  }

}
