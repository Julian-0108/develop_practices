import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/screens/login/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class RequestInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const headersConfig: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    const authData = localStorage.getItem('authData');

    if (authData) {
      headersConfig['access-token'] = JSON.parse(authData).token;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
