import { Directive, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appStars]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(click)': 'onMouseClick()'
  }
})
export class StarsDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer) {

  }
  onMouseLeave(){
    let childrens = this.elRef.nativeElement.parentNode.children;
    for (let i = childrens.length; i--; childrens[i].classList.remove('hovered')){}
    this.elRef.nativeElement.classList.remove('currentHovered')
  }

  onMouseEnter(){
    let childrens = this.elRef.nativeElement.parentNode.children;
    for (let i = childrens.length; i--; childrens[i].classList.add('hovered')){}
    this.elRef.nativeElement.classList.add('currentHovered')
  }

  onMouseClick(){
    let childrens = this.elRef.nativeElement.parentNode.children;

    for (let i = childrens.length; i--; childrens[i].classList.remove('choosen')){}
    for ( let j = 0; j < this.elRef.nativeElement.getAttribute('data-index'); j++ ){
      childrens[j].classList.add('choosen')
    }
  }
}
