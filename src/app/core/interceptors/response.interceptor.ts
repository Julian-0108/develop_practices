import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { NotificationService } from '@shared/components/notification/services/notification.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/screens/login/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class ResponseInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.notificationService.openSimpleSnackBar({title: 'Seguridad', message: 'Es necesario volver a iniciar sesión', type: 'info'});
            this.authService.logout();
            this.router.navigateByUrl('/login');
          } else if (error.status === 500 || error.status === 0) {
            this.router.navigateByUrl('/error');
          } else if ([400, 402, 403].includes(error.status)) {
            if (error?.error?.message) {
              this.notificationService.openSimpleSnackBar({title: 'Error', message: error[`error`][`message`], type: 'error'});
            }
          }
          return throwError(error);
        })
      )
  }
}