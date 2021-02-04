import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNotImage]',
})
export class NotImageDirective {
  constructor(private _elementImg: ElementRef) {}
  @HostListener('error')
  onError(): void {
    this._elementImg.nativeElement.src = 'assets/images/not-image.png';
  }
}
