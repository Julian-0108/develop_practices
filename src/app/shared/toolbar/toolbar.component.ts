import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { version } from "../../../../package.json";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public version = version;

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
