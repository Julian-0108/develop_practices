import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-custom-history',
  templateUrl: './custom-history.component.html',
  styleUrls: ['./custom-history.component.scss'],
})
export class CustomHistoryComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CustomHistoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  displayedColumns: string[] = [
    'domain',
    'knowledgeArea',
    'type',
    'name',
    'platform',
    'tecnology',
    'formation'
  ];
  ngOnInit(): void {

  }
}
