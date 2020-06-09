import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { apiUrl } from "src/environments/environment.prod";

const headers = new HttpHeaders({
	"Content-Type": "application/json",
});

@Injectable({ providedIn: 'root' })

export class AuthService {

	private resource = '/user';

	constructor(private http: HttpClient) { }

	public token: any = '';

	login(username: string, password: string) {
		let url = apiUrl + this.resource;
		let body = JSON.stringify({ username, password });
		return this.http.post<any>(url, body, { headers }).pipe(map(user => {
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
