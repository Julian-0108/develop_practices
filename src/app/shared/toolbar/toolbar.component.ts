import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/screens/login/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('authData');
  }

  hideQrIcon() {
    return this.router.url !== '/home';
  }

}
