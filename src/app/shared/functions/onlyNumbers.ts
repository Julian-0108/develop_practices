
  export class OnlyNumbers {
  /**
   * @autor Hanna
   * @description Esta función limita los campos a que solo reciban números, utilizando
   * una expresión regular que valida que el valor ingresado esté entre 0 y 9.
   */
  classicOnlyNumbers(value: any) {
    value.returnValue = /^[0-9]+$/.test(value.key.toString());
  }
}
