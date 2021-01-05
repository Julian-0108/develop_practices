import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification.component';

interface snackOptionsInterface {
  title: string;
  message: string;
  type:string;
  action?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(options: snackOptionsInterface) {
    return this._snackBar.openFromComponent(NotificationComponent, {
      data: {
        title: options.title,
        message: options.message,
        action: options.action || '',
        type: options.type
      },
      duration: 500000000000000,
      horizontalPosition: options.horizontalPosition || 'right',
      verticalPosition: options.verticalPosition || 'top',
      panelClass: options.type
    });
    // options.message, options.action || '',
  }
}
