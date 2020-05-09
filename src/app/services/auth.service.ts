import * as jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL_SERVICES } from "../config/config";

import { UserModels } from '../models/user.models';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private userLoggedIn = new BehaviorSubject(false);

	private resource = '/auth/login';
	public currentUserSubject: BehaviorSubject<UserModels>;
	public currentUser: Observable<UserModels>;

	constructor(private http: HttpClient ) {}

	login(username: string, password: string) {
		let authData = window.btoa(username + ':' + password);

		// Headers
		const headers = new HttpHeaders({
			"Content-Type": "application/json",
			"Authorization": `Basic ${authData}`
		});

		let url = URL_SERVICES + this.resource;
		let body = JSON.stringify({ username, password });
		return this.http.post<any>(url, body, { headers }).pipe(map(user => {
			localStorage.setItem('authData', JSON.stringify(user));
		}));
	}

	isLoggedIn() {
		return !!this.getToken();
    }

    getLoggedIn(): Observable<boolean> {
        return this.userLoggedIn.asObservable();
      }

    getLoggedInValue(): boolean {
    return this.userLoggedIn.getValue();
    }

    setLoggedIn(value: boolean) {
        this.userLoggedIn.next(value);
    }

	getToken() {
		let authData = JSON.parse(localStorage.getItem('authData'));
		return authData == null ? undefined : authData.access_token;
	}

	getTokenExpirationDate(token: string): Date {
		const decoded = jwt_decode(token);
		if (decoded.exp === undefined) return null;

		const date = new Date(0);
		date.setUTCSeconds(decoded.exp);
		return date;
	}

	isTokenExpired(token?: string): boolean {
		if (!token) token = this.getToken();
		if (!token) return true;

		const date = this.getTokenExpirationDate(token);
		if (date === undefined || null) return false;
		console.log(date);
		return !(date.valueOf() > new Date().valueOf());
	}

	tokenExists(): Boolean {
		let token = localStorage.getItem('token')
		return token !== null
	}

	getUsername(): string {
		const decoded = jwt_decode(this.getToken());
		return decoded.identity;
	}
}
