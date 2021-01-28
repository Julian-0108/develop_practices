import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  private readonly SITES_SETI = ['/movements', '/temperature', '/kits', '/generateqr'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('authData');
  }

  hideMenuSites() {
    return this.SITES_SETI.includes(this.router.url);
  }

  hideOptions() {
    return this.router.url !== '/login';
  }

}
