import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Title } from "@angular/platform-browser";
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
  public pages: any = {
    error: {
      options: { path: 'assets/error500.json' },
      message: 'Ocurrió un error inesperado, por favor intente nuevamente.',
      buttonMessage: 'Reintentar la solicitud'
    },
    notfound: {
      options: { path: 'assets/data.json' },
      message: 'Lo sentimos, no encontramos la página que buscas.',
      buttonMessage: 'Regresar'
    },
    notPermits: {
      options: { path: 'assets/notPermissionsPage.json' },
      message: 'Lo sentimos, no tienes permiso para acceder.',
      buttonMessage: 'Regresar'
    },
    underConstruction:{
      options: { path: '' },
      message: 'Lo sentimos, no encontamos un mensaje original para decirte que estamos trabajando en esta página',
      buttonMessage: 'Regresar'
    }
  }

  public pageError!: string;


  constructor(
    private _location: Location,
    private _title: Title,
    private router: Router
  ) {
    this._title.setTitle('Mundo SETI');
  }

  ngOnInit(): void {
    const page: any = this.router.url.replace('/', '');
    this.pageError = this.pages[page] ? page : 'notfound';
  }

  onBack(): void {
    this._location.back();
  }

}
