import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.scss'],
})
export class ProfileHistoryComponent implements OnInit {
  constructor() {}
  historyId! : string;

  history = [
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '23/12/2020',
      id: 'id1',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '23/12/2020',
      id: 'id2',
    },
    {
      name: 'Lina Jaramillo',
      description:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. In molestiae voluptas quibusdam,',
      date: '23/12/2020',
      id: 'id3',
    },
  ];

  ngOnInit(): void {}

  onStepClicked(id: string) {
    console.log(id);
    this.historyId = id;
  }
}
