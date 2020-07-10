import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'sitios';

  updateSubscription!: Subscription;

  constructor(
    private router: Router
  ) {}

  ngOnInit () {
    this.updateSubscription = interval(300000).subscribe(() => { // 5 minutes interval
      window.location.reload();
    });
  }

  hideNavbar() {
    return this.router.url !== '/login';
  }

}
