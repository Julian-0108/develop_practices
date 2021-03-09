import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Location, ViewportScroller } from '@angular/common';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'sitios';
  constructor(private newIcon: MatIconRegistry, private dom:DomSanitizer,
    private loc: Location, private router: Router, private viewportScroller: ViewportScroller) {
    // Icons
    this.newIcon.addSvgIcon('seti', this.dom.bypassSecurityTrustResourceUrl('./assets/images/logo-seti-blanco.svg'));
    // Router
    this.router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
      console.log(e);

      // this is fix for dynamic generated(loaded..?) content
      setTimeout(() => {
        if (e.position) {
          this.viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          this.viewportScroller.scrollToAnchor(e.anchor);
        } else {
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });
    });
  }

  ngOnInit () {
  }

  hideNavbar() {
    return this.router.url !== '/login';
  }

  locationBack() {
    window.history.back();
  }

  locationBackAngular() {
    this.loc.back();
  }

}
