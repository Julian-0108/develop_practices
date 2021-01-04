import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

interface snackOptionsInterface {
  message: string;
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
    return this._snackBar.open(options.message, options.action || '', {
      duration: 5000,
      horizontalPosition: options.horizontalPosition || 'right',
      verticalPosition: options.verticalPosition || 'top',
    });
  }
}
