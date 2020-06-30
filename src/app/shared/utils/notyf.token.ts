import { InjectionToken } from '@angular/core';
import { Notyf } from 'notyf';

export const NOTYF = new InjectionToken<Notyf>('NotyfToken');

export function notyfFactory(): Notyf {
  return new Notyf({
    duration: 5000,
    dismissible: true,
    position: {
      y: 'top',
      x: 'right'
    },
    types: [
      {
        type: 'info',
        background: '#4996B4',
        icon: {
          className: 'material-icons',
          tagName: 'i',
          text: 'error'
        }
      }
    ]
  });
}