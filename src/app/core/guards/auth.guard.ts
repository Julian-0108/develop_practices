import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/screens/login/services/auth/auth.service';
import Swal from 'sweetalert2';

const TOAST = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  showCloseButton: true,
  onOpen: (TOAST) => {
    TOAST.addEventListener('mouseenter', Swal.stopTimer)
    TOAST.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isLoggedIn()) {
      TOAST.fire({
        icon: 'warning',
        title: 'Iniciar sesión primero'
      })
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

}
