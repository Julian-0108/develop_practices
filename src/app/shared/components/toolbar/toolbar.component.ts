import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AuthService } from '@app/screens/login/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}
  adminRol: any;
  userName: any;
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

  hideOptions() {
    if (!this.authService.isLoggedIn()) {
      return false;
    }
    this.adminRol =  this.authService.validateAccessPage('manage-roles');
    this.userName = JSON.parse(String(localStorage.getItem('MSauthData'))).user.displayName;
    return this.router.url !== '/login';
  }

  redirect(){
    this.router.navigate(['/home'])
  }
}
