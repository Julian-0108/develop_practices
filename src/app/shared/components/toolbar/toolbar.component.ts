import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/screens/login/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private readonly SITES_SETI = ['/movements', '/temperature', '/kits', '/generateqr'];

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  hideMenuSites() {
    if (!this.authService.isLoggedIn()) { return false; }
    return this.SITES_SETI.includes(this.router.url);
  }

  hideOptions() {
    if (!this.authService.isLoggedIn()) { return false; }
    return this.router.url !== '/login';
  }

}
