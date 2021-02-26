import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '@screens/login/services/auth/auth.service';

@Pipe({
  name: 'cards'
})

/**
 * @author Santiago Patiño
 * @description Retorna una lista con los cards que el usuario puede ver
 */

export class CardsPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  transform(values: any[]): unknown {
    if (!values) { return []; }
    const aux = [];
    for (const value of values) {
      if (value.url !== null && this.authService.validateAccessPage(value.url.replace('/', ''))) {
        aux.push(value);
      }
    }
    return aux;
  }

}
