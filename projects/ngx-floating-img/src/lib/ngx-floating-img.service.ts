import { Injectable, Inject, Renderer2, RendererFactory2, Optional, NgZone } from '@angular/core';

import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN, NGX_FI_WINDOW } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';

@Injectable()
export class NgxFloatingImgService {

  private _windowResizeDebounceTime: number = 200;
  private _windowScrollDebounceTime: number = 50;
  private _activeNGXFloatingImgComp: NgxFloatingImgComponent;
  private _renderer2: Renderer2;

  constructor(
    @Inject(NGX_FLOATING_IMG_OPTIONS_TOKEN) private _ngxFloatingImgOptions: NGXFloatingImgOptions,
    @Optional() @Inject(NGX_FI_WINDOW) private _window: Window,
    private _rend2Factory: RendererFactory2,
    private _ngZone: NgZone
  ) {
    this._renderer2 = this._rend2Factory.createRenderer(null, null);

    this.bindViewportResizeEvent ();
    this.bindViewportScrollEvent ();
  }

  private bindViewportResizeEvent (): void {
    if (this._window) {
      this._ngZone.runOutsideAngular(() => {
        fromEvent(this._window, 'resize').pipe(
          debounceTime(this._windowResizeDebounceTime)
        ).subscribe(() => {
          this.setActiveImgInnerWrapperStyle();
        });
      });
    }
  }

  private bindViewportScrollEvent (): void {
    if (this._window) {
      this._ngZone.runOutsideAngular(() => {
        fromEvent(this._window, 'scroll').pipe(
          debounceTime(this._windowScrollDebounceTime)
        ).subscribe(() => {
          if (this._activeNGXFloatingImgComp && this._activeNGXFloatingImgComp.showFullImgTrigger) {
            this._ngZone.run(() => {
              this.closeFullImg();
            });
          }
        });
      });
    }
  }

  public validateInputs (ngxFI: NgxFloatingImgComponent): boolean {
    if (ngxFI.imgWidth == null || ngxFI.imgHeight == null) {
      if (ngxFI.imgWidth == null && ngxFI.imgHeight == null) {
        throw 'image Width and height "imgWidth","imgHeight" are missing'; 
      } else if (ngxFI.imgWidth == null) {
        throw 'image Width "imgWidth" is missing'; 
      } else {
        throw 'image height "imgHeight" is missing'; 
      }
    } 
    return true;
  }

  public getImgRatio (imgWidth: number, imgHeight: number): number {
    return (imgHeight / imgWidth) * 100;
  }

  public getVpPadding (vpPadding: number): object {
    let padding = `${vpPadding}px`;
    return {
      left: padding,
      top: padding,
      right: padding,
      bottom: padding
    };
  }

  public getCSSTransitionObj (transition: string): object {
    return {
      transition: transition,
      '-webkit-transition': transition,
      '-moz-transition': transition,
      '-o-transition': transition
    };
  }

  public setComponentDefaultValues (ngxFI: NgxFloatingImgComponent): void {
    if(ngxFI.imgAnimationType == null) ngxFI.imgAnimationType = this._ngxFloatingImgOptions.imgAnimationType;
    if(ngxFI.imgAnimationSpeed == null) ngxFI.imgAnimationSpeed = this._ngxFloatingImgOptions.imgAnimationSpeed;
    if(ngxFI.overlayAnimation == null) ngxFI.overlayAnimation = this._ngxFloatingImgOptions.overlayAnimation;
    if(ngxFI.overlayColor == null) ngxFI.overlayColor = this._ngxFloatingImgOptions.overlayColor;
    if(ngxFI.overlayDismiss == null) ngxFI.overlayDismiss = this._ngxFloatingImgOptions.overlayDismiss;
    if(ngxFI.showLoading == null) ngxFI.showLoading = this._ngxFloatingImgOptions.showLoading;
    if(ngxFI.thumbBgColor == null) ngxFI.thumbBgColor = this._ngxFloatingImgOptions.thumbBgColor;
    if(ngxFI.vpPadding == null) ngxFI.vpPadding = this._ngxFloatingImgOptions.vpPadding;
    if(ngxFI.showCloseButton == null) ngxFI.showCloseButton = this._ngxFloatingImgOptions.showCloseButton;
  }

  public showFullImg (ngxFI: NgxFloatingImgComponent): void {
    ngxFI.beforeShow.emit(ngxFI.id);
    this.setFullImgSrc(ngxFI);
    this._activeNGXFloatingImgComp = ngxFI;
    this._window.requestAnimationFrame(() => {
      ngxFI.showFullImgTrigger = true;  
      ngxFI.isShowFullImgInProgress = true;
      setTimeout(() => {
        ngxFI.isImgActionsWrapperVisible = true;
        ngxFI.onShow.emit(ngxFI.id);
      }, ngxFI.imgAnimationSpeed);
      this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'width', `${ngxFI.imgFigure.nativeElement.clientWidth}px`);
      this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'left', ngxFI.imgFigure.nativeElement.getBoundingClientRect().left - ngxFI.vpPadding + 'px');
      this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'top', ngxFI.imgFigure.nativeElement.getBoundingClientRect().top - ngxFI.vpPadding + 'px');
      this._window.requestAnimationFrame(() => {
        this.setActiveImgInnerWrapperStyle ()
      });
    });
  }

  private setActiveImgInnerWrapperStyle (): void {
    if (this._activeNGXFloatingImgComp && this._activeNGXFloatingImgComp.showFullImgTrigger) {
      let imgFigureClientWidth = this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientWidth;
      let imgFigureClientHeight = this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientHeight;
      let thumbScale: number = this.calculateThumbScale(
        imgFigureClientWidth, 
        imgFigureClientHeight, 
        this._activeNGXFloatingImgComp.imgWrapper.nativeElement.clientWidth,
        this._activeNGXFloatingImgComp.imgWrapper.nativeElement.clientHeight, 
        this._activeNGXFloatingImgComp.imgWidth, 
        this._activeNGXFloatingImgComp.imgHeight);
      let transform: string = `translate(-50%,-50%) scale(${thumbScale})`;
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'width', `${imgFigureClientWidth}px`);
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', '50%');
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', '50%');
      this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, transform);
      this.setActiveImgActionsWrapperStyle(thumbScale);
    }
  }

  private setActiveImgActionsWrapperStyle (thumbScale: number): void {
    // set img actions wrapper style
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgActionsWrapper.nativeElement, 'width', `${this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientWidth * thumbScale}px`);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgActionsWrapper.nativeElement, 'height', `${this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientHeight * thumbScale}px`);
  }

  private _testTime = null;

  public closeFullImg (): void {
    this._activeNGXFloatingImgComp.beforeClose.emit(this._activeNGXFloatingImgComp.id);
    this._activeNGXFloatingImgComp.isShowFullImgInProgress = false;
    this._activeNGXFloatingImgComp.isImgActionsWrapperVisible = false;
    let imgFigureClientWidth = this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientWidth;
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'width', `${imgFigureClientWidth}px`);
    console.log(this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().top);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().left - this._activeNGXFloatingImgComp.vpPadding + 'px');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().top - this._activeNGXFloatingImgComp.vpPadding + 'px');
    this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'translate(0,0) scale(1,1)');
    if (this._testTime) {
      clearTimeout(this._testTime);
    }
    this._testTime = setTimeout(() => {
      this._activeNGXFloatingImgComp.showFullImgTrigger = false
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', 'auto');
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', 'auto');
      this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'translate(0,0) scale(1,1)');
      this._activeNGXFloatingImgComp.onClose.emit(this._activeNGXFloatingImgComp.id);
    }, this._activeNGXFloatingImgComp.imgAnimationSpeed);
  }

  private calculateThumbScale (thumbWidth: number, thumbHeight: number, containerWidth: number, containerHeight: number, 
      fullImgWidth: number, fullImgHeight: number): number {
    let widthScale = containerWidth / thumbWidth;
    let heightScale = containerHeight / thumbHeight;
    if (fullImgWidth > containerWidth && fullImgHeight > containerHeight) {
      return widthScale * thumbHeight <= containerHeight ? widthScale : heightScale;
    } else {
      return fullImgWidth > fullImgHeight && (widthScale * thumbHeight <= containerHeight) ? widthScale : heightScale; 
    } 
  }

  private setElementTransform (nativeElement, transform: string): void {
    this._renderer2.setStyle(nativeElement, 'transform', transform);
    this._renderer2.setStyle(nativeElement, '-webkit-transform', transform);
    this._renderer2.setStyle(nativeElement, '-moz-transform', transform);
    this._renderer2.setStyle(nativeElement, '-o-transform', transform);
  }

  private setFullImgSrc (ngxFIComponent: NgxFloatingImgComponent): void {
    if (ngxFIComponent.imgSrc && !ngxFIComponent.isFullImageLoaded) {
      let onLoadlistenerFunc = this._renderer2.listen(ngxFIComponent.fullImg.nativeElement, 'load', () => {
        ngxFIComponent.isFullImageLoaded = true;
        ngxFIComponent.onFullImgLoad.emit(ngxFIComponent.id);
        onLoadlistenerFunc();
      });
      this._renderer2.setProperty(ngxFIComponent.fullImg.nativeElement, 'src', ngxFIComponent.imgSrc);
    }
  }

}
