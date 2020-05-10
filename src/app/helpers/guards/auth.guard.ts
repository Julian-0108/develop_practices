import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 5000,
  showCloseButton: true,
  onOpen: (Toast) => {
    Toast.addEventListener('mouseenter', Swal.stopTimer)
    Toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.isLoggedIn()) {
      Toast.fire({
        icon: 'warning',
        title: 'Iniciar sesión primero'
      })
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    return true;
  }
}
