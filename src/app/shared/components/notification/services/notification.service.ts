import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import {SnackOptionsInterface} from '@shared/interfaces/notification.interface'

@Injectable({
  providedIn: 'root',
})

export class NotificationService {
  constructor(private _snackBar: MatSnackBar,private _dialog: MatDialog) {}

  /**
   * @param params Este parámetro contiene los datos que definirán cómo se ve
   * el snack y el contenido que tendrá (título, descripción).
   * los tipos permitidos para el parámetro 'type' son:
   * error
   * success
   * warning
   * info
   */

  openSimpleSnackBar(params: SnackOptionsInterface) {
    const icon = this.iconCondition(params);
    return this._snackBar.openFromComponent(NotificationComponent, {
      data: {
        title: params.title,
        message: params.message,
        type: params.type,
        icon,
      },
      duration: 3000,
      horizontalPosition: params.horizontalPosition || 'right',
      verticalPosition: params.verticalPosition || 'top',
      panelClass: params.type,
    });
  }
  openComplexSnackBar(params: SnackOptionsInterface) {
    const icon = this.iconCondition(params);
    return this._dialog.open(ConfirmComponent, {
      data: {
        title: params.title,
        message: params.message,
        type: params.type,
        action: params.action,
        contraryAction: params.contraryAction,
        icon,
      },
      autoFocus: false
    });
  }
  iconCondition(params:SnackOptionsInterface){
    let icon: any = params.type;
    if (icon === 'success') {
      icon = 'check_circle';
    }
    else if (icon === 'info') {
      icon = 'notification_important';
    }
    return icon
  }
}
