import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderAlphabetically'
})
export class OrderAlphabeticallyPipe implements PipeTransform {

  /**
   * @author Wilmer Contreras
   * @description este pipe cumple la funcion de ordenar alfabeticamente dependiendo al name.
   * @param value tipo Array. 
   */
  transform(value: any[]): any {
    
    if (!value) return []
    
    return value.sort( (a, b): any=> {
      
      if (a.name < b.name) {
        return -1;
        
      } else {
        return 1;
      }
      return 0;
    });
  }

}
