import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification.component';

interface SnackOptionsInterface {
  title: string;
  message: string;
  type: string;
  action?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  openSimpleSnackBar(options: SnackOptionsInterface) {
    let icon = options.type;
    switch (icon) {
      case 'success': {
        icon = 'check_circle'
        break;
      }
      case 'info': {
        icon = 'notification_important'
        break;
      }
      default: {
        break;
      }
    }
    return this._snackBar.openFromComponent(NotificationComponent, {
      data: {
        title: options.title,
        message: options.message,
        type: options.type,
        icon
      },
      duration: 3000,
      horizontalPosition: options.horizontalPosition || 'right',
      verticalPosition: options.verticalPosition || 'top',
      panelClass: options.type,
    });
  }
  openComplexSnackBar(options: SnackOptionsInterface) {
    let icon = options.type;
    switch (icon) {
      case 'success': {
        icon = 'check_circle'
        break;
      }
      case 'info': {
        icon = 'notification_important'
        break;
      }
      default: {
        break;
      }
    }
    return this._snackBar.openFromComponent(NotificationComponent, {
      data: {
        title: options.title,
        message: options.message,
        action: options.action || 'cerrar',
        type: options.type,
        icon
      },
      duration: 3000,
      horizontalPosition: options.horizontalPosition || 'right',
      verticalPosition: options.verticalPosition || 'top',
      panelClass: options.type,
    });
  }
}
