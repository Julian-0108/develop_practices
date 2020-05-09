import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { AuthService } from 'src/app/services/auth.service';

const AUTH_PREFIX = "Bearer";

@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {

    let authData = JSON.parse(localStorage.getItem('authData'))
    if (authData) {
      request = request.clone({
        setHeaders: {
          Authorization: `${AUTH_PREFIX} ${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);

  }

}
