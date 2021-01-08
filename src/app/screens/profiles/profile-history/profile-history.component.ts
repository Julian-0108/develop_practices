import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss']
})
export class ProfileHistoryComponent implements OnInit {

  constructor() { }

  info = {
    name: 'Lina Jaramillo',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
    date: '23/12/2020'
  }

  ngOnInit(): void {
  }

}
