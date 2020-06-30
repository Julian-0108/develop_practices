import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'sars-ui-Web';

  constructor(private router: Router) {}

  hideNavbar() {
    return this.router.url !== '/login';
  }

}
