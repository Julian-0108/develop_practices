
  export class OnlyNumbers {
    /**
     * @autor Hanna
     * @description Esta función limita los campos a que solo reciban números, utilizando
     * una expresión regular que valida que el valor ingresado esté entre 0 y 9.
     * @param event Evento que fue emitido desde el campo origen y contiene toda
     * la información necesaria para ejecutar la función.
     */
    classicOnlyNumbers(event: any) {
      event.returnValue = /^[0-9]+$/.test(event.key.toString());
    }
    /**
     * @autor Hanna
     * @description Esta función limita la cantidad de dígitos a la cantidad
     * que se requiera.
     * @param inputValue Valor del campo origen desde donde se ejecuta la función
     * @param maxNumber Numero límite de dígitos que puede contener el campo
     * @param event Evento que fue emitido desde el campo origen y contiene la información
     * necesaria, para retornar el valor.
     */
    lenghtValidator(inputValue: Array<number | string>, maxNumber: number, event: Event) {
      if (inputValue.length == maxNumber) {
        event.returnValue = false;
      }

    }
    ValidatorMath(inputValue:any  , maxNumber: number, event: Event){
     /* if (inputValue > 50) {
        event.returnValue = false;
      }*/
    }
  }
