import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss'],
})
export class ValidatorComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() name!: string;
  @Input() otherIcon!: boolean;
  constructor() {
  }

  ngOnInit(): void {}
  getErrors() {
    const errors: any = [];
    const formErrors: any = this.form.get(this.name)!.errors
    for (const error of Object.entries<any>(formErrors)) {
      let staticMsg = null;
      if (error[0] === 'required') {
        staticMsg = 'Campo obligatorio';
      }
      if (error[0] === 'minlength') {
        staticMsg = `Este campo debe tener mínimo ${error[1].requiredLength} caracteres`;
      }
      if (error[0] === 'maxlength') {
        staticMsg = `Este campo debe tener máximo de ${error[1].requiredLength} caracteres`;
      }
      if (error[0] === 'pattern' && String(error[1].requiredPattern) === '^[0-9][0-9]?$|^100$') {
        staticMsg = `Este campo debe estar entre 0 y 100;`;
      }
      errors.push({
        type: error[0],
        msg: staticMsg || error[1],
      });
    }
    return errors;
  }

  getError() {
    try {
      return this.getErrors()[0];
    } catch {
      return false;
    }
  }
}
