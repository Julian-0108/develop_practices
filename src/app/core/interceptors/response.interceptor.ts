import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


const TOAST = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 4000,
  showCloseButton: true,

  onOpen: (Toast) => {
    Toast.addEventListener('mouseenter', Swal.stopTimer)
    Toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Injectable({
  providedIn: 'root'
})

export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {

          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            TOAST.fire({
              icon: 'error',
              title: `${errorMessage}`
            });
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            TOAST.fire({
              icon: 'error',
              title: `${errorMessage}`
            });
          }
          return throwError(errorMessage);
        })
      )
  }
}