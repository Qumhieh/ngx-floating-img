import { Injectable, Renderer2 } from '@angular/core';
import { NgxFloatingImgComponent } from './ngx-floating-img.component';

@Injectable()
export class MobileTouchService {

  private _dragResetDuration: number = 100;
  private _dragDistTillClose: number = 80;
  private _touchClientY: number;

  private _touchStartEvent: () => void;
  private _touchEndEvent: () => void;
  private _touchMoveEvent: () => void;

  constructor () { }

  public bindTouchEvents(rend2: Renderer2, ngxFIComp: NgxFloatingImgComponent): void {
    this.removeTouchEvents();
    this._touchStartEvent = rend2.listen(ngxFIComp.imgContainer.nativeElement, 'touchstart', this.onTouchStart.bind(this, ngxFIComp));
    this._touchEndEvent = rend2.listen(ngxFIComp.imgContainer.nativeElement, 'touchend', this.onTouchEnd.bind(this, ngxFIComp));
    this._touchMoveEvent = rend2.listen(ngxFIComp.imgContainer.nativeElement, 'touchmove', this.onTouchMove.bind(this, ngxFIComp));
  }
  
  public removeTouchEvents(): void {
    if (this._touchStartEvent || this._touchEndEvent || this._touchMoveEvent) {
      this._touchStartEvent();
      this._touchEndEvent();
      this._touchMoveEvent();
    } 
  }

  private onTouchStart(ngxFIComp: NgxFloatingImgComponent): void {
    ngxFIComp.imgWrapperTransitionDurationNum = 0;
  }

  private onTouchEnd(ngxFIComp: NgxFloatingImgComponent): void {
    if (Math.abs(ngxFIComp.imgWrapperTranslateYNum) > this._dragDistTillClose) {
      ngxFIComp.closeFullImg(null);
    } else {
      ngxFIComp.imgWrapperTransitionDurationNum = this._dragResetDuration;
      ngxFIComp.imgWrapperTranslateYNum = 0;
    }
    this._touchClientY = null;
  }

  private onTouchMove(ngxFIComp: NgxFloatingImgComponent): void {
    if (ngxFIComp.isShowFullImgInProgress) {
      if (this._touchClientY != null) {
        ngxFIComp.imgWrapperTranslateYNum += (<TouchEvent>event).touches[0].clientY - this._touchClientY;
      } 
      this._touchClientY = (<TouchEvent>event).touches[0].clientY;
    }
  }

}
