import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

type types = 'error' | 'success' | 'warning' | 'info';
export interface SnackOptionsInterface {
  title: string;
  message: string;
  type: types;
  action?: string;
  contraryAction?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}
