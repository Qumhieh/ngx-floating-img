import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[fitMainWrapper]'
})
export class FitMainWrapperDirective {

  constructor(
    private _rend: Renderer2,
    private _el: ElementRef) {
    this._rend.addClass(this._el.nativeElement, 'fit-main-wrapper');
  }

}
