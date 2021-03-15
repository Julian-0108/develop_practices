import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'sitios';
  constructor(private newIcon: MatIconRegistry, private dom:DomSanitizer, private router: Router) {
    // Icons
    this.newIcon.addSvgIcon('seti', this.dom.bypassSecurityTrustResourceUrl('./assets/images/logo-seti-blanco.svg'));
  }

  ngOnInit () {
  }

  hideNavbar() {
    return this.router.url !== '/login';
  }

}
