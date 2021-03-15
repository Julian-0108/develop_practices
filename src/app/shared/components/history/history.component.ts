import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = ['name', 'levels', 'status'];
  historyFilter: any = [
    {
      showDate: 'ejemplo',
      author: 'ejemplo',
      descriptionChanges: 'ejemplo',
      createdAt: '10/03/2021',
      _id: 'fjnufufUubybui',
    },
  ];
  dataSource: any = [
    {
      name: 'Analista Especialista',
      levels: ['N1','N2','N3'],
      status: true,
    },
  ];
  formFilterHistory = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  ngOnInit(): void {}
  onSelectStartDate(event: any) {}
  onSelectEndDate(event: any) {}
  onPreview(id: any) {}
}
