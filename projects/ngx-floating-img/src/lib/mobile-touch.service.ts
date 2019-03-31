import { Injectable } from '@angular/core';
import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { fromEvent,  Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';

@Injectable()
export class MobileTouchService {

  private _dragResetDuration: number = 100;
  private _dragDistTillClose: number = 90;
  private _touchMoveThrottleTime: number = 5;
  private _touchClientY: number;

  private _touchStartSubEvent: Subscription;
  private _touchEndSubEvent: Subscription;
  private _touchMoveSubEvent: Subscription;

  private _touchMoveTempVal;


  constructor ( ) { }

  public bindTouchEvents(ngxFIComp: NgxFloatingImgComponent): void {
    this.removeTouchEvents();
    this._touchStartSubEvent = fromEvent(ngxFIComp.imgContainer.nativeElement, 'touchstart', {passive: true}).subscribe(this.onTouchStart.bind(this, ngxFIComp));
    this._touchEndSubEvent = fromEvent(ngxFIComp.imgContainer.nativeElement, 'touchend').subscribe(this.onTouchEnd.bind(this, ngxFIComp));
    this._touchMoveSubEvent = fromEvent(ngxFIComp.imgContainer.nativeElement, 'touchmove', {passive: true}).pipe(
      // throttleTime(this._touchMoveThrottleTime)
    ).subscribe(this.onTouchMove.bind(this, ngxFIComp));
  }
  
  public removeTouchEvents(): void {
    if (this._touchStartSubEvent || this._touchEndSubEvent || this._touchMoveSubEvent) {
      this._touchStartSubEvent.unsubscribe();
      this._touchEndSubEvent.unsubscribe();
      this._touchMoveSubEvent.unsubscribe();
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
      ngxFIComp.imgContainerOpacity = 1;
    }
    this._touchClientY = null;
  }

  private onTouchMove(ngxFIComp: NgxFloatingImgComponent): void {
    if (ngxFIComp.isShowFullImgInProgress) {
      if (this._touchClientY != null) {
        ngxFIComp.imgWrapperTranslateYNum += (<TouchEvent>event).touches[0].clientY - this._touchClientY;
        this._touchMoveTempVal = Math.abs(ngxFIComp.imgWrapperTranslateYNum);
        if (this._touchMoveTempVal <= 100) {
          ngxFIComp.imgContainerOpacity = 1 - (this._touchMoveTempVal / 1000);
        } else {
          ngxFIComp.imgContainerOpacity = 0.9;
        }
      } 
      this._touchClientY = (<TouchEvent>event).touches[0].clientY;
    }
  }

}
