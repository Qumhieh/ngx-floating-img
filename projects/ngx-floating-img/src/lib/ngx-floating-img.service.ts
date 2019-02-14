import { Injectable, Inject, Renderer2 } from '@angular/core';

import { NgxFloatingImgComponent } from './ngx-floating-img.component';
import { NGX_FLOATING_IMG_OPTIONS_TOKEN } from './ngx-floating-img';
import { NGXFloatingImgOptions } from './model/ngx-floating-img-options';

@Injectable()
export class NgxFloatingImgService {

  constructor(
    @Inject(NGX_FLOATING_IMG_OPTIONS_TOKEN) private _ngxFloatingImgOptions: NGXFloatingImgOptions
  ) { }

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

}
