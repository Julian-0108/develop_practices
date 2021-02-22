import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  options: AnimationOptions = {
    path: 'assets/error500.json',
  };
  constructor(
    private _location: Location,
    private _title: Title
  ) {
    this._title.setTitle('Mundo SETI - Error inesperado');
  }

  ngOnInit(): void {
  }

  onBack(): void {
    this._location.back();
  }

}
