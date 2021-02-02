import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { AuthService } from 'src/app/screens/login/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})

export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const headersConfig: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };

    const authData = this.authService.getToken();
    if (authData) {
      headersConfig['Authorization'] = `Bearer ${JSON.parse(authData).token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }
}
