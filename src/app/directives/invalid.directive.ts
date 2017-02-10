import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInvalid]'
})
export class InvalidDirective {

  constructor(private elRef: ElementRef) {

  }

}
