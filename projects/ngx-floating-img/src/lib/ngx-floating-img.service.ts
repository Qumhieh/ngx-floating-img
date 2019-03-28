import { Injectable, Inject, Renderer2, RendererFactory2, Optional, NgZone } from '@angular/core';
import { fromEvent, timer } from 'rxjs';
import { debounceTime, filter, throttleTime, debounce } from 'rxjs/operators';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN, NGX_FI_WINDOW } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';
import { DeviceDetectorService } from './device-detector.service';
import { MobileTouchService } from './mobile-touch.service';

const ESC_KEY_CODE: number = 27;

@Injectable()
export class NgxFloatingImgService {

  private _disabledScroll: boolean = false;
  private _htmlEleScrollVal: object = {};

  private _imgAnimationMinSpeed: number = 0;
  private _imgAnimationMaxSpeed: number = 800;
  private _minFullImgSize: number = 200;
  private _windowResizeDebounceTime: number = 100;
  private _windowScrollDebounceTime: number = 50;
  private _windowScrollThrottleTime: number = 30;
  private _closeTransSpeedAfterExceed: number = 90;
  private _isCloseTimeExceeded: boolean = false;
  private _showFullImgTimeout = null;
  private _closeFullImgTimeout = null;
  private _activeNGXFloatingImgComp: NgxFloatingImgComponent;
  private _renderer2: Renderer2;


  constructor(
    @Inject(NGX_FLOATING_IMG_OPTIONS_TOKEN) private _ngxFloatingImgOptions: NGXFloatingImgOptions,
    @Optional() @Inject(NGX_FI_WINDOW) private _window: any,
    private _deviceDetectorService: DeviceDetectorService,
    private _mobileTouchService: MobileTouchService,
    private _rend2Factory: RendererFactory2,
    private _ngZone: NgZone
  ) {
    this._renderer2 = this._rend2Factory.createRenderer(null, null);
    this._ngZone.runOutsideAngular(() => {
      this.bindViewportResizeEvent();
      this.bindViewportScrollEvent();
      this.bindEscButtonAction();
    });
  }

  private bindViewportResizeEvent (): void {
    if (this._window) {
      fromEvent(this._window, 'resize').pipe(
        filter(() => this.isNGXFloatingImgActive()),
        debounceTime(this._windowResizeDebounceTime)
      ).subscribe(() => {
        // this.setShowImgPhaseTwoStyle();
        this._ngZone.run(() => {
          this.closeFullImg();
        });
      });
    }
  }

  private bindViewportScrollEvent (): void {
    if (this._window) {
      fromEvent(this._window, 'scroll').pipe(
        filter(() => this.isNGXFloatingImgActive()),
        debounce(() => timer((this._activeNGXFloatingImgComp && this._activeNGXFloatingImgComp.isShowFullImgInProgress) ? this._windowScrollDebounceTime : 0)),
        throttleTime(this._windowScrollThrottleTime)
      ).subscribe(() => {
          this._ngZone.run(() => {
            this.closeFullImg();
          });
      });
    }
  }

  private isNGXFloatingImgActive(): boolean {
    return this._activeNGXFloatingImgComp && this._activeNGXFloatingImgComp.showFullImgTrigger;
  }

  private bindEscButtonAction (): void {
    if (this._window) {
      fromEvent(this._window, 'keyup').pipe(
        filter((e:KeyboardEvent) => this.isNGXFloatingImgActive() && e.keyCode === ESC_KEY_CODE)
      ).subscribe(() => {
        this._ngZone.run(() => {
          this.closeFullImg();
        });
      });
    }
  }

  private clearShowFullImgTimeout (): void {
    if (this._showFullImgTimeout) {
      clearTimeout(this._showFullImgTimeout);
    }
  }

  private clearCloseFullImgTimeout (): void {
    if (this._closeFullImgTimeout) {
      clearTimeout(this._closeFullImgTimeout);
    }
  }

  private setShowImgPhaseOneStyle (): void {
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'width', `${this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientWidth}px`);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'height', `${this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientHeight}px`);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().left - this._activeNGXFloatingImgComp.vpPadding + 'px');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().top - this._activeNGXFloatingImgComp.vpPadding + 'px');
  }

  private setShowImgPhaseTwoStyle (): void {
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
      // set img actions wrapper style
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgActionsWrapper.nativeElement, 'width', `${imgFigureClientWidth * thumbScale}px`);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgActionsWrapper.nativeElement, 'height', `${imgFigureClientHeight * thumbScale}px`);
    }
  }

  private setCloseImgPhaseOneStyle (): void {
    let imgFigureClientWidth = this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientWidth;
    this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'translate(0,0) scale(1,1)');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'width', `${imgFigureClientWidth}px`);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().left - this._activeNGXFloatingImgComp.vpPadding + 'px');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().top - this._activeNGXFloatingImgComp.vpPadding - this._activeNGXFloatingImgComp.imgWrapperTranslateYNum + 'px');
  }

  private setCloseImgPhaseTwoStyle (): void {
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', 'auto');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', 'auto');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'width', 'auto');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'height', 'auto');
    this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'translate(0,0) scale(1,1)');
    this._activeNGXFloatingImgComp.imgWrapperTranslateYNum = 0;
    this._activeNGXFloatingImgComp.imgContainerOpacity = 1;
  }

  private calculateThumbScale (thumbWidth: number, thumbHeight: number, containerWidth: number, containerHeight: number, 
    fullImgWidth: number, fullImgHeight: number): number {
    if (containerWidth < this._minFullImgSize) containerWidth = this._minFullImgSize;
    if (containerHeight < this._minFullImgSize) containerWidth = this._minFullImgSize;
    let scaleResult: number;
    let widthScale = containerWidth / thumbWidth;
    let heightScale = containerHeight / thumbHeight;
    if (fullImgWidth < containerWidth && fullImgHeight < containerHeight) {
      scaleResult = fullImgWidth > fullImgHeight ? fullImgWidth / thumbWidth : fullImgHeight / thumbHeight;
    } else if (fullImgWidth >= containerWidth && fullImgHeight >= containerHeight) {
      scaleResult = widthScale * thumbHeight <= containerHeight ? widthScale : heightScale;
    } else {
      scaleResult = fullImgWidth > fullImgHeight && (widthScale * thumbHeight <= containerHeight) ? widthScale : heightScale; 
    } 
    return Math.round(scaleResult * 100) / 100;
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

  private setCloseFullImgTimeout(timeout: number): any {
    return setTimeout(() => {
      this._activeNGXFloatingImgComp.imgInnerWrapperTransition = this.getCSSTransitionObj(`all ${this._activeNGXFloatingImgComp.imgAnimationSpeed}ms ${this._activeNGXFloatingImgComp.imgAnimationType}`);
      this._activeNGXFloatingImgComp.showFullImgTrigger = false
      this.setCloseImgPhaseTwoStyle();
      this._activeNGXFloatingImgComp.onClose.emit(this._activeNGXFloatingImgComp.id);
      this.resetScrollable();
      this._activeNGXFloatingImgComp = null;
      this._isCloseTimeExceeded = false;
    }, timeout);
  }

  private setScrollable(disableScroll: boolean, ngxFI: NgxFloatingImgComponent): void {
    if (this._window) {
      let htmlEle = this._window.document.documentElement;
      if (this._window.innerHeight < htmlEle.scrollHeight) {
        if (this._deviceDetectorService.isDesktop()) {
          if (disableScroll) {
            this.disableScrolling();
          }
        } else {
          this.disableScrolling();
          this._mobileTouchService.bindTouchEvents(ngxFI);
        }
      }
    }
  }

  private resetScrollable(): void {
    if (this._window && this._disabledScroll) {
      let htmlEle = this._window.document.documentElement;
      this._window.requestAnimationFrame(() => {
        this._renderer2.setStyle(htmlEle, 'position', this._htmlEleScrollVal['position']);
        this._window.scrollTo(0, -parseInt(htmlEle.style.top));
        this._renderer2.setStyle(htmlEle, 'overflow-y', this._htmlEleScrollVal['overflowY']);
        this._renderer2.setStyle(htmlEle, 'top', this._htmlEleScrollVal['top']);
        this._renderer2.setStyle(htmlEle, 'right', this._htmlEleScrollVal['right']);
        this._renderer2.setStyle(htmlEle, 'left', this._htmlEleScrollVal['left']);
        this._mobileTouchService.removeTouchEvents();
        this._disabledScroll = false;
      });
    }
  }

  private disableScrolling(): void {
    if (this._window) {
      this._disabledScroll = true;
      let htmlEle = this._window.document.documentElement;
      let scrollTop = this._window.pageYOffset || (this._window.document.documentElement || this._window.document.body.parentNode || this._window.document.body).scrollTop;
      // save old styles
      this._htmlEleScrollVal['position'] = htmlEle.style.position;
      this._htmlEleScrollVal['overflowY'] = htmlEle.style.overflowY;
      this._htmlEleScrollVal['top'] = htmlEle.style.top;
      this._htmlEleScrollVal['right'] = htmlEle.style.right;
      this._htmlEleScrollVal['left'] = htmlEle.style.left;
      // set disable scrolling styles
      this._renderer2.setStyle(htmlEle, 'position', 'fixed');
      this._renderer2.setStyle(htmlEle, 'overflow-y', 'scroll');
      this._renderer2.setStyle(htmlEle, 'top', `-${scrollTop}px`);
      this._renderer2.setStyle(htmlEle, 'right', '0px');
      this._renderer2.setStyle(htmlEle, 'left', '0px');
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
    if (ngxFI.imgAnimationSpeed < 0 || ngxFI.imgAnimationSpeed > 1000) {
      throw `image animation speed "imgAnimationSpeed" must be a valid number between ${this._imgAnimationMinSpeed} and ${this._imgAnimationMaxSpeed}`; 
    }
    return true;
  }

  public getImgRatio (imgWidth: number, imgHeight: number): number {
    return Math.floor((imgHeight / imgWidth) * 1000) / 10;
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
    if(ngxFI.loadingColor == null) ngxFI.loadingColor = this._ngxFloatingImgOptions.loadingColor;
    if(ngxFI.thumbBgColor == null) ngxFI.thumbBgColor = this._ngxFloatingImgOptions.thumbBgColor;
    if(ngxFI.vpPadding == null) ngxFI.vpPadding = this._ngxFloatingImgOptions.vpPadding;
    if(ngxFI.showCloseButton == null) ngxFI.showCloseButton = this._ngxFloatingImgOptions.showCloseButton;
    if(ngxFI.disableScroll == null) ngxFI.disableScroll = this._ngxFloatingImgOptions.disableScroll;
  }

  public showFullImg (ngxFI: NgxFloatingImgComponent): void {
    ngxFI.beforeShow.emit(ngxFI.id);
    this.setScrollable(ngxFI.disableScroll, ngxFI);
    this._window.requestAnimationFrame(() => {
      this.setFullImgSrc(ngxFI);
      this._activeNGXFloatingImgComp = ngxFI;
      this.clearShowFullImgTimeout();
      this._window.requestAnimationFrame(() => {
        this._showFullImgTimeout = setTimeout(() => {
          ngxFI.isImgActionsWrapperVisible = true;
          ngxFI.onShow.emit(ngxFI.id);
        }, ngxFI.imgAnimationSpeed);
        ngxFI.showFullImgTrigger = true;  
        ngxFI.isShowFullImgInProgress = true;
        this.setShowImgPhaseOneStyle();
        this._window.requestAnimationFrame(() => {
          this.setShowImgPhaseTwoStyle ()
        });
      });
    });

  }

  public closeFullImg (): void {
    if (this._activeNGXFloatingImgComp) {
      this.clearShowFullImgTimeout();
      this.clearCloseFullImgTimeout();
      if (this._isCloseTimeExceeded) {
        this._closeFullImgTimeout = this.setCloseFullImgTimeout(this._closeTransSpeedAfterExceed + 10);
      } else {
        this._closeFullImgTimeout = this.setCloseFullImgTimeout(this._activeNGXFloatingImgComp.imgAnimationSpeed);
      }
      if (this._activeNGXFloatingImgComp.isShowFullImgInProgress) {
        this._activeNGXFloatingImgComp.beforeClose.emit(this._activeNGXFloatingImgComp.id);
        if (this._activeNGXFloatingImgComp.imgAnimationSpeed > this._closeTransSpeedAfterExceed) {
          setTimeout(() => {
            if (this._activeNGXFloatingImgComp) {
              this._isCloseTimeExceeded = true;
              this._activeNGXFloatingImgComp.imgInnerWrapperTransition = this.getCSSTransitionObj(`all ${this._closeTransSpeedAfterExceed}ms linear`);
            }
          }, this._activeNGXFloatingImgComp.imgAnimationSpeed);
        }
        this._activeNGXFloatingImgComp.isShowFullImgInProgress = false;
      }
      this._activeNGXFloatingImgComp.isImgActionsWrapperVisible = false;
      this.setCloseImgPhaseOneStyle();
    }
  }

}
