import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public matSnackBarRef: MatSnackBarRef<NotificationComponent>,

  ) {

  }

  ngOnInit(): void {}
}
