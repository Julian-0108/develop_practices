import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { AuthService } from '@app/screens/login/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    if (!this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return false;
    }

    const path = route.url[0].path.replace('/', '').toLowerCase();

    if (!this.authService.validateAccessPage(path)) {
      this.router.navigate(['/notPermits']);
      return false;
    }

    return true;
  }

}
