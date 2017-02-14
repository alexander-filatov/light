import { Directive, ElementRef, Renderer, OnInit } from '@angular/core';

@Directive({
  selector: '[appShowMenu]'

})
export class ShowMenuDirective implements OnInit{
  currentTarget: any;
  constructor(private elRef: ElementRef) { }

ngOnInit() {
    window.addEventListener('click', (event) => {
    let checkbox = <HTMLInputElement> document.getElementById('hidden_menu_toggle');
      this.currentTarget = event.srcElement;
      while (this.currentTarget.parentNode && this.currentTarget != this.elRef.nativeElement){
        if (this.currentTarget.parentNode === document.body) {
            checkbox.checked = false;
          break
        }

        this.currentTarget = this.currentTarget.parentNode
      }

    })
}
}
