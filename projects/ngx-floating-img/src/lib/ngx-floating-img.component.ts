import { Component, OnInit, Input, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

import { NgxFloatingImgService } from './ngx-floating-img.service';

@Component({
  selector: 'ngx-floating-img',
  templateUrl: './ngx-floating-img.component.html',
  styleUrls: ['./ngx-floating-img.component.css']
})
export class NgxFloatingImgComponent implements OnInit {

  public showFullImgTrigger: boolean = false;
  public isShowFullImgInProgress: boolean = false;
  public isFullImageLoaded: boolean = false;
  public isImgActionsWrapperVisible: boolean = false;

  public imageRatio: number;
  public imgWrapperStyle: object = {};
  public imgWrapperTranslateYNum: number = 0;
  public imgWrapperTransitionDurationNum: number = 0;
  public imgInnerWrapperTransition: object = {};
  public overlayTransition: object = {};
  
  @Input('id') id: string;
  @Input('imgSrc') imgSrc: string;
  @Input('imgWidth') imgWidth: number;
  @Input('imgHeight') imgHeight: number;
  @Input('imgAnimationType') imgAnimationType: string;
  @Input('imgAnimationSpeed') imgAnimationSpeed: number;
  @Input('overlayColor') overlayColor: string;
  @Input('overlayAnimation') overlayAnimation: boolean;
  @Input('overlayDismiss') overlayDismiss: boolean;
  @Input('thumbBgColor') thumbBgColor: string;
  @Input('vpPadding') vpPadding: number;
  @Input('showCloseButton') showCloseButton: boolean;
  @Input('showLoading') showLoading: boolean;
  @Input('loadingColor') loadingColor: string;
  @Input('disableScroll') disableScroll: boolean;
  // TODO: @Input('thumbLazyLoad') thumbLazyLoad: boolean;
  // TODO: @Input('navigation') navigation: boolean;
  // TODO: @Input('dynamicThumbBGColor') dynamicThumbBGColor: boolean;

  @Output('beforeShow') beforeShow = new EventEmitter<string>();
  @Output('afterShow') onShow = new EventEmitter<string>();
  @Output('onFullImgLoad') onFullImgLoad = new EventEmitter<string>();
  @Output('beforeClose') beforeClose = new EventEmitter<string>();
  @Output('afterClose') onClose = new EventEmitter<string>();

  @ViewChild('imgFigure') imgFigure: ElementRef;
  @ViewChild('imgContainer') imgContainer: ElementRef;
  @ViewChild('imgWrapper') imgWrapper: ElementRef;
  @ViewChild('imgInnerWrapper') imgInnerWrapper: ElementRef;
  @ViewChild('fullImg') fullImg: ElementRef;
  @ViewChild('imgActionsWrapper') imgActionsWrapper: ElementRef;

  get imgWrapperTranslateY(): SafeStyle {
    return this._sanitizer.bypassSecurityTrustStyle(`translateY(${this.imgWrapperTranslateYNum}px)`);
  }

  // get imgWrapperTransitionDuration(): SafeStyle {
  //   return this._sanitizer.bypassSecurityTrustStyle(`${this.imgWrapperTranslateYNum}`);
  // }

  constructor(
    private _ngxFloatingImgService: NgxFloatingImgService,
    private _sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    // validate inputs
    if (this._ngxFloatingImgService.validateInputs(this)) {
      // set component default values
      this._ngxFloatingImgService.setComponentDefaultValues(this);
      // set default component style
      this.setComponentStyle();
    }
  }

  private setComponentStyle (): void {
    // set image ratio
    this.imageRatio = this._ngxFloatingImgService.getImgRatio(this.imgWidth, this.imgHeight);
    // set image wrapper padding
    this.imgWrapperStyle = this._ngxFloatingImgService.getVpPadding(this.vpPadding);
    // set image inner wrapper animation
    if (this.imgAnimationSpeed) {
      this.imgInnerWrapperTransition = this._ngxFloatingImgService.getCSSTransitionObj(`all ${this.imgAnimationSpeed}ms ${this.imgAnimationType}`);
    }
    // set overlay animation
    this.overlayTransition = this.overlayAnimation ? this._ngxFloatingImgService.getCSSTransitionObj(`background-color ${this.imgAnimationSpeed}ms ${this.imgAnimationType}`) : null;
  }

  public showFullImg (): void {
    if (!this.showFullImgTrigger) {
      this._ngxFloatingImgService.showFullImg(this);
    }
  }

  public closeFullImg (event): void {
    if (this.showFullImgTrigger) {
      if (event) {
        let eleClass = event.target.classList[0];
        if (eleClass == 'fi-close-button' || (this.overlayDismiss && (eleClass == 'fi-img-container' || eleClass == 'fi-img-wrapper'))) {
          this._ngxFloatingImgService.closeFullImg();
        }
      } else {
        this._ngxFloatingImgService.closeFullImg();
      }
    }
  }

}