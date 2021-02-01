import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class CustomValidatorService {
  constructor() {}

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = control.value.length > 0 && control.value.trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
}
