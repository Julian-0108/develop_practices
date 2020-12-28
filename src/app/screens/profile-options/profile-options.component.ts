import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-options',
  templateUrl: './profile-options.component.html',
  styleUrls: ['./profile-options.component.scss']
})
export class ProfileOptionsComponent implements OnInit {
  title = 'Equipos Base'
  description = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Maxime, consequuntur assumenda'
  constructor() { }

  ngOnInit(): void {
  }

  x() {
    console.log('hola')
  }

}
