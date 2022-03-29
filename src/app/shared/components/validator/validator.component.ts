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
  constructor() {}

  ngOnInit(): void {}

  getErrors() {
    const errors: any = [];
    const formErrors: any = this.form.get(this.name)?.errors;
    for (const error of Object.entries<any>(formErrors)) {
      let staticMsg = null;
      staticMsg = this.getMessage(error);
      errors.push({
        type: error[0],
        msg: staticMsg || error[1],
      });
    }
    return errors;
  }

  getMessage(error: any[]) {
    switch (error[0]) {
      case 'required': return 'Campo obligatorio';
      case 'minlength': return `Este campo debe tener mínimo ${error[1].requiredLength} caracteres`;
      case 'maxlength': return `Este campo debe tener máximo de ${error[1].requiredLength} caracteres`;
      case 'pattern': return `No cumple el patrón ${error[1].requiredPattern}`;
      case 'email': return 'El correo no es válido';
      case 'max': return `Este campo debe tener máximo de ${error[1].max.toString().length} caracteres`;
      case 'min': return `Este campo debe tener mínimo ${error[1].min.toString().length} caracteres`;
      case 'whitespace': return 'Espacios en blanco';
      default:
        break;
    }
  }

  getError() {
    try {
      return this.getErrors()[0];
    } catch {
      return false;
    }
  }
}
