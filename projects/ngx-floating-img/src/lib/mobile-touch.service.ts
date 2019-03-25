import { Injectable, Optional, Inject, ElementRef, Renderer2 } from '@angular/core';
import { NGX_FI_WINDOW } from './ngx-floating-img';
import { NgxFloatingImgComponent } from './ngx-floating-img.component';

// TODO 
// remove transition duration, and fix img reset

@Injectable()
export class MobileTouchService {

  private _dragResetDuration: number = 100;
  private _dragDistTillClose: number = 50;
  private _touchClientY: number;

  private _touchEndEvent: () => void;
  private _touchMoveEvent: () => void;

  constructor (
    @Optional() @Inject(NGX_FI_WINDOW) private _window: any,
  ) { }

  public bindTouchEvents(rend2: Renderer2, ngxFIComp: NgxFloatingImgComponent): void {
    this.removeTouchEvents();
    this.resetCompDragOptions(ngxFIComp);
    this._touchEndEvent = rend2.listen(ngxFIComp.imgContainer.nativeElement, 'touchend', this.onTouchEnd.bind(this, rend2, ngxFIComp));
    this._touchMoveEvent = rend2.listen(ngxFIComp.imgContainer.nativeElement, 'touchmove', this.onTouchMove.bind(this, ngxFIComp));
  }
  
  public removeTouchEvents(): void {
    if (this._touchEndEvent || this._touchMoveEvent) {
      this._touchEndEvent();
      this._touchMoveEvent();
    } 
  }

  private resetCompDragOptions(ngxFIComp: NgxFloatingImgComponent): void {
    ngxFIComp.imgWrapperTransitionDurationNum = 0;
  }

  private onTouchEnd(rend2: Renderer2, ngxFIComp: NgxFloatingImgComponent): void {
    if (Math.abs(ngxFIComp.imgWrapperTranslateYNum) > this._dragDistTillClose) {
      ngxFIComp.closeFullImg(null);
      ngxFIComp.imgWrapperTransitionDurationNum = ngxFIComp.imgAnimationSpeed;
    } else {
      ngxFIComp.imgWrapperTransitionDurationNum = this._dragResetDuration;
    }
    ngxFIComp.imgWrapperTranslateYNum = 0;
    this._touchClientY = null;
  }

  private onTouchMove(ngxFIComp: NgxFloatingImgComponent): void {
    if (this._touchClientY != null) {
      ngxFIComp.imgWrapperTranslateYNum += (<TouchEvent>event).touches[0].clientY - this._touchClientY;
      this._touchClientY = (<TouchEvent>event).touches[0].clientY;
    } else {
      this._touchClientY = (<TouchEvent>event).touches[0].clientY;
    }
  }

}
