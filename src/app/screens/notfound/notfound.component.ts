import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  constructor(
    private _location: Location,
    private _title: Title
  ) {
    this._title.setTitle('Mundo SETI - página no encontrada');
   }

  ngOnInit(): void {

  }

  onBack(): void {
    this._location.back();
  }

}
