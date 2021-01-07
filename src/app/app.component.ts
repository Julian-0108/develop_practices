import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'sitios';
  constructor(private router: Router, private newIcon: MatIconRegistry, private dom:DomSanitizer) {
    // Icons
    this.newIcon.addSvgIcon('seti', this.dom.bypassSecurityTrustResourceUrl('./assets/images/logo-seti-blanco.svg'));
  }

  ngOnInit () {
  }

  hideNavbar() {
    return this.router.url !== '/login';
  }

}
