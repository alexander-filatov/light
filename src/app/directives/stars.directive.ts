import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appStars]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class StarsDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer) {

  }
  onMouseLeave(){

  }

  onMouseEnter(){
    console.log(this)
  }
}
