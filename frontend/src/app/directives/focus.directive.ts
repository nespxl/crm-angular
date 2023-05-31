import {Directive, ElementRef, OnInit} from '@angular/core'

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    // При открытии формы ставим фокус на первое поле ввода
    this.el.nativeElement.focus()
  }
}
