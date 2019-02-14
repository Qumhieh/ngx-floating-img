import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';

@Injectable()
export class NgxFloatingImgService {

  private _activeNGXFloatingImgComp: NgxFloatingImgComponent;
  private _renderer2: Renderer2;

  constructor(
    @Inject(NGX_FLOATING_IMG_OPTIONS_TOKEN) private _ngxFloatingImgOptions: NGXFloatingImgOptions,
    private _rend2Factory: RendererFactory2
  ) {
    this._renderer2 = this._rend2Factory.createRenderer(null, null);
  }

  public validateInputs (): boolean {
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

  public getImgTransition (imgAnimationSpeed: number, imgAnimationType: string): object {
    let transition = `all ${imgAnimationSpeed}ms ${imgAnimationType}`;
    return {
      transition: transition,
      '-webkit-transition': transition,
      '-moz-transition': transition,
      '-o-transition': transition
    };
  }

  public getOverlayTransition (overlayAnimation: boolean, animationSpeed: number): object {
    if (!overlayAnimation) return null;
    let transition = `background-color ${animationSpeed}ms linear`;
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
  }

  public showFullImg (ngxFI: NgxFloatingImgComponent): void {
    ngxFI.beforeShow.emit(ngxFI.id);
    this.setFullImgSrc(ngxFI);
    this._activeNGXFloatingImgComp = ngxFI;
    let imgFigureClientWidth = ngxFI.imgFigure.nativeElement.clientWidth;
    window.requestAnimationFrame(() => {
      ngxFI.showFullImgTrigger = true;  
      ngxFI.showFullImgInProgress = true;
      this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'width', `${imgFigureClientWidth}px`);
      this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'left', ngxFI.imgFigure.nativeElement.getBoundingClientRect().left - ngxFI.vpPadding + 'px');
      this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'top', ngxFI.imgFigure.nativeElement.getBoundingClientRect().top - ngxFI.vpPadding + 'px');
      window.requestAnimationFrame(() => {
        let thumbScale: number = this.calculateThumbScale(imgFigureClientWidth, ngxFI.imgWrapper.nativeElement.clientWidth, ngxFI.imgWidth);
        let transform: string = `translate(-50%,-50%) scale(${thumbScale}, ${thumbScale})`;
        this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'width', `${imgFigureClientWidth}px`);
        this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'left', '50%');
        this._renderer2.setStyle(ngxFI.imgInnerWrapper.nativeElement, 'top', '50%');
        this.setElementTransform (ngxFI.imgInnerWrapper.nativeElement, transform);
        ngxFI.afterShow.emit(ngxFI.id);
      });
    });
  }

  public closeFullImg (): void {
    this._activeNGXFloatingImgComp.beforeClose.emit(this._activeNGXFloatingImgComp.id);
    this._activeNGXFloatingImgComp.showFullImgInProgress = false;
    let imgFigureClientWidth = this._activeNGXFloatingImgComp.imgFigure.nativeElement.clientWidth;
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'width', `${imgFigureClientWidth}px`);
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().left - this._activeNGXFloatingImgComp.vpPadding + 'px');
    this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', this._activeNGXFloatingImgComp.imgFigure.nativeElement.getBoundingClientRect().top - this._activeNGXFloatingImgComp.vpPadding + 'px');
    this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'translate(0,0) scale(1,1)');
    setTimeout(() => {
      this._activeNGXFloatingImgComp.showFullImgTrigger = false
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'left', 'auto');
      this._renderer2.setStyle(this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'top', 'auto');
      this.setElementTransform (this._activeNGXFloatingImgComp.imgInnerWrapper.nativeElement, 'translate(0,0) scale(1,1)');
      this._activeNGXFloatingImgComp.afterClose.emit(this._activeNGXFloatingImgComp.id);
    }, this._activeNGXFloatingImgComp.imgAnimationSpeed);
  }

  private calculateThumbScale (thumbWidth: number, containerWidth: number, fullImgWidth: number): number {
    return containerWidth <= fullImgWidth ? containerWidth / thumbWidth : fullImgWidth / thumbWidth;
  }

  private setElementTransform (nativeElement, transform: string): void {
    this._renderer2.setStyle(nativeElement, 'transform', transform);
    this._renderer2.setStyle(nativeElement, '-webkit-transform', transform);
    this._renderer2.setStyle(nativeElement, '-moz-transform', transform);
    this._renderer2.setStyle(nativeElement, '-o-transform', transform);
  }

  private setFullImgSrc (ngxFIComponent: NgxFloatingImgComponent): void {
    if (!ngxFIComponent.isFullImageLoaded) {
      let onLoadlistenerFunc = this._renderer2.listen(ngxFIComponent.fullImgEle.nativeElement, 'load', () => {
        ngxFIComponent.isFullImageLoaded = true;
        ngxFIComponent.onFullImgLoad.emit(ngxFIComponent.id);
        onLoadlistenerFunc();
      });
      this._renderer2.setProperty(ngxFIComponent.fullImgEle.nativeElement, 'src', ngxFIComponent.imgSrc);
    }
  }

}
