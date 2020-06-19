import { Injectable, Injector, InjectionToken } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
// import { RollbarService } from 'src/app/app.module';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import Rollbar from 'rollbar';


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

export const RollbarService = new InjectionToken<Rollbar>('rollbar');

@Injectable({
  providedIn: 'root'
})

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {

          const rollbar = this.injector.get(RollbarService);
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
          rollbar.error(error)
          return throwError(errorMessage);
        })
      )
  }
}