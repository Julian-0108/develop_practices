import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-adminprofiles',
  templateUrl: './adminprofiles.component.html',
  styleUrls: ['./adminprofiles.component.scss']
})
export class AdminprofilesComponent implements OnInit {

  constructor(
    private titleService: Title
  ) {
    this.titleService.setTitle('Mundo SETI - administrar perfiles');
  }

  ngOnInit(): void {
  }

}
